-- ============================================================
-- AFRIVA — HUB SCHEMA (buyer storefront + seller dashboard)
--
-- Builds both apps' tables in the `afriva` schema of the shared Supabase
-- project. Reconstructed from the two codebases (no schema file existed).
--
-- Security model: both apps talk to these tables straight from the browser,
-- so RLS carries the weight.
--   - Buyers read and write their own profile, addresses, cart, orders,
--     saved cards and payments; they can only move their own delivered
--     order to "return requested".
--   - Sellers read and update orders that contain their products, and
--     move them pending → packed → shipped → delivered, or settle returns.
--   - Orders are priced and stock is taken by a trigger on insert, and
--     ratings are recomputed by a SECURITY DEFINER function, so no browser
--     ever gets UPDATE on another seller's product or sets its own price.
--   - email_otps and newsletter emails are never readable from a browser.
--
-- Re-runnable: drops and rebuilds the schema (auth users are untouched),
-- then run `node scripts/seed-hub.mjs`.
-- Requires `afriva` in Project Settings → Data API → Exposed schemas.
-- ============================================================

BEGIN;

DROP SCHEMA IF EXISTS afriva CASCADE;
CREATE SCHEMA afriva;

-- ────────────────────────────────────────────────────────────
-- TABLES
-- ────────────────────────────────────────────────────────────
CREATE TABLE afriva.users (
  uid               UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  authid            UUID,
  name              TEXT,
  username          TEXT,
  email             TEXT,
  profile_image     TEXT,
  phonenumber       TEXT,
  address           TEXT NOT NULL DEFAULT '',
  full_address      JSONB NOT NULL DEFAULT '{}'::jsonb,
  country           TEXT,
  countryid         TEXT,
  accounttype       TEXT,
  provider          TEXT,
  latitude          DOUBLE PRECISION,
  longitude         DOUBLE PRECISION,
  device_token      TEXT,
  favorite_products UUID[] NOT NULL DEFAULT '{}',
  isactive          BOOLEAN NOT NULL DEFAULT TRUE,
  createdby         UUID,
  updatedby         UUID,
  createdat         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedat         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE afriva.address (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES afriva.users(uid) ON DELETE CASCADE,
  name         TEXT,
  address      TEXT,
  country      TEXT,
  city         TEXT,
  phone_number TEXT,
  is_primary   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX address_user_id_idx ON afriva.address (user_id);

CREATE TABLE afriva.sellers (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email        TEXT,
  name         TEXT,
  brandname    TEXT,
  brandaddress TEXT,
  imageurl     TEXT,
  created_by   UUID,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE afriva.brands (
  brand_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  logo_url     TEXT NOT NULL DEFAULT '',
  brandaddress TEXT,
  seller_id    UUID REFERENCES afriva.sellers(id) ON DELETE SET NULL,
  created_by   UUID,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX brands_seller_id_idx ON afriva.brands (seller_id);

CREATE TABLE afriva.categories (
  category_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_name  TEXT NOT NULL,
  category_image TEXT,
  subcategories  TEXT[] NOT NULL DEFAULT '{}',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX categories_name_key ON afriva.categories (lower(category_name));

-- size_details: [{ colorName, color:'#hex', size, price, stock, quantity, discount, delivery_fee }]
CREATE TABLE afriva.products (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                 TEXT NOT NULL DEFAULT '',
  description          TEXT NOT NULL DEFAULT '',
  product_image        TEXT[] NOT NULL DEFAULT '{}',
  size_chart           TEXT NOT NULL DEFAULT '',
  brand_id             UUID REFERENCES afriva.brands(brand_id) ON DELETE SET NULL,
  category_id          UUID REFERENCES afriva.categories(category_id) ON DELETE SET NULL,
  seller_id            UUID REFERENCES afriva.sellers(id) ON DELETE CASCADE,
  subcategory          TEXT[] NOT NULL DEFAULT '{}',
  sizes                TEXT[] NOT NULL DEFAULT '{}',
  colors               JSONB NOT NULL DEFAULT '[]'::jsonb,
  size_details         JSONB NOT NULL DEFAULT '[]'::jsonb,
  price                NUMERIC,
  discount             NUMERIC,
  total_number_of_sell INTEGER NOT NULL DEFAULT 0,
  overall_rating       JSONB NOT NULL DEFAULT '{"rating":0,"totalRating":0,"totalReviews":0}'::jsonb,
  created_by           UUID,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX products_seller_id_idx   ON afriva.products (seller_id);
CREATE INDEX products_category_id_idx ON afriva.products (category_id);
CREATE INDEX products_brand_id_idx    ON afriva.products (brand_id);
CREATE INDEX products_created_at_idx  ON afriva.products (created_at DESC);

CREATE TABLE afriva.cart (
  cart_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES afriva.users(uid) ON DELETE CASCADE,
  product_id     UUID NOT NULL REFERENCES afriva.products(id) ON DELETE CASCADE,
  quantity       INTEGER NOT NULL DEFAULT 1 CHECK (quantity BETWEEN 1 AND 50),
  selected_size  TEXT,
  selected_color TEXT,
  created_by     UUID,
  updated_by     UUID,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ
);
CREATE INDEX cart_user_id_idx ON afriva.cart (user_id);

CREATE TABLE afriva.orders (
  order_id              TEXT PRIMARY KEY,
  product_ids           UUID[] NOT NULL DEFAULT '{}',
  quantity              INTEGER NOT NULL DEFAULT 0,
  status                TEXT NOT NULL DEFAULT 'pending',
  payment_method        TEXT NOT NULL DEFAULT 'cash',
  user_delivery_address JSONB NOT NULL DEFAULT '{}'::jsonb,
  selected_size_details JSONB,
  subtotal              NUMERIC NOT NULL DEFAULT 0,
  delivery_charge       NUMERIC NOT NULL DEFAULT 0,
  total                 NUMERIC NOT NULL DEFAULT 0,
  total_amount          NUMERIC NOT NULL DEFAULT 0,
  packing_date          TIMESTAMPTZ,
  shipping_date         TIMESTAMPTZ,
  delivery_date         TIMESTAMPTZ,
  created_by            UUID REFERENCES afriva.users(uid) ON DELETE CASCADE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT orders_status_check CHECK (status IN (
    'pending','paid','packed','shipped','delivered','completed',
    'return requested','return accepted','return rejected'))
);
CREATE INDEX orders_created_by_idx  ON afriva.orders (created_by);
CREATE INDEX orders_status_idx      ON afriva.orders (status);
CREATE INDEX orders_created_at_idx  ON afriva.orders (created_at DESC);
CREATE INDEX orders_product_ids_gin ON afriva.orders USING gin (product_ids);

CREATE TABLE afriva.return_requests (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id              TEXT NOT NULL UNIQUE REFERENCES afriva.orders(order_id) ON DELETE CASCADE,
  quantity              INTEGER NOT NULL DEFAULT 1,
  reason                TEXT,
  details               TEXT,
  comments              TEXT,
  location_confirmation TEXT,
  refund_to             TEXT,
  refund_amount         NUMERIC NOT NULL DEFAULT 0,
  images                TEXT[] NOT NULL DEFAULT '{}',
  confirm_return        BOOLEAN NOT NULL DEFAULT FALSE,
  created_by            UUID,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE afriva.reviews (
  review_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES afriva.products(id) ON DELETE CASCADE,
  order_id      TEXT REFERENCES afriva.orders(order_id) ON DELETE SET NULL,
  review_by     UUID REFERENCES afriva.users(uid) ON DELETE CASCADE,
  created_by    UUID,
  reviewer_name TEXT,
  description   TEXT,
  total_score   SMALLINT NOT NULL CHECK (total_score BETWEEN 1 AND 5),
  review_images TEXT[] NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX reviews_product_id_idx ON afriva.reviews (product_id, created_at DESC);

-- Saved cards: the demo app stores only the brand, last four digits and
-- expiry. Full card numbers and CVCs must never be stored.
CREATE TABLE afriva.payment_methods (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by       UUID NOT NULL REFERENCES afriva.users(uid) ON DELETE CASCADE,
  card_holder_name TEXT,
  type             TEXT,
  card_no          TEXT CHECK (card_no IS NULL OR card_no ~ '^\*{0,12}[0-9]{4}$'),
  expiry           TEXT,
  cvc              TEXT CHECK (cvc IS NULL),
  "isPrimary"      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE afriva.payment_history (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount     NUMERIC NOT NULL DEFAULT 0,
  type       TEXT,
  created_by UUID REFERENCES afriva.users(uid) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE afriva.subscribe_newsletter (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT NOT NULL,
  active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX subscribe_newsletter_email_key ON afriva.subscribe_newsletter (lower(email));

CREATE TABLE afriva.promocode (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code       TEXT NOT NULL,
  discount   NUMERIC NOT NULL,
  assignto   UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX promocode_code_assignto_key ON afriva.promocode (code, assignto);

CREATE TABLE afriva.referby (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_mail TEXT NOT NULL,
  referred_by UUID REFERENCES afriva.users(uid) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX referby_seller_mail_idx ON afriva.referby (lower(seller_mail));

-- Email codes, used by the apps' server routes only (service role).
CREATE TABLE afriva.email_otps (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email      TEXT NOT NULL,
  otp        TEXT NOT NULL,
  purpose    TEXT NOT NULL DEFAULT 'signup',
  attempts   SMALLINT NOT NULL DEFAULT 0,
  verified   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX email_otps_email_idx ON afriva.email_otps (email, created_at DESC);

-- ────────────────────────────────────────────────────────────
-- HELPERS
-- ────────────────────────────────────────────────────────────
CREATE FUNCTION afriva.is_seller(uid UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = '' AS $$
  SELECT EXISTS (SELECT 1 FROM afriva.sellers s WHERE s.id = uid);
$$;

-- Does this order contain a product of this seller?
CREATE FUNCTION afriva.sells_in_order(seller UUID, ids UUID[])
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = '' AS $$
  SELECT EXISTS (SELECT 1 FROM afriva.products p WHERE p.id = ANY(ids) AND p.seller_id = seller);
$$;

-- Recompute a product's rating from its reviews (a true average).
CREATE FUNCTION afriva.refresh_rating(p_product UUID)
RETURNS JSONB LANGUAGE SQL SECURITY DEFINER SET search_path = '' AS $$
  UPDATE afriva.products p
     SET overall_rating = jsonb_build_object(
       'rating', COALESCE((SELECT round(avg(total_score)::numeric, 2) FROM afriva.reviews WHERE product_id = p_product), 0),
       'totalRating', COALESCE((SELECT sum(total_score) FROM afriva.reviews WHERE product_id = p_product), 0),
       'totalReviews', (SELECT count(*) FROM afriva.reviews WHERE product_id = p_product))
   WHERE p.id = p_product
  RETURNING overall_rating;
$$;

-- Newsletter sign-up without exposing the list.
CREATE FUNCTION afriva.subscribe(p_email TEXT)
RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  IF p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$' THEN
    RETURN 'invalid';
  END IF;
  INSERT INTO afriva.subscribe_newsletter (email) VALUES (lower(trim(p_email)))
  ON CONFLICT ((lower(email))) DO NOTHING;
  RETURN CASE WHEN FOUND THEN 'subscribed' ELSE 'already' END;
END;
$$;

-- Seller invitation check without exposing the invite list.
CREATE FUNCTION afriva.seller_invite(p_email TEXT)
RETURNS JSONB LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = '' AS $$
  SELECT jsonb_build_object('invited', TRUE, 'referrer', u.name, 'referrer_image', u.profile_image)
  FROM afriva.referby r LEFT JOIN afriva.users u ON u.uid = r.referred_by
  WHERE lower(r.seller_mail) = lower(trim(p_email))
  LIMIT 1;
$$;

-- Order status guard: who may move an order where.
CREATE FUNCTION afriva.guard_order()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = '' AS $$
DECLARE
  me UUID := auth.uid();
  is_seller_of BOOLEAN;
BEGIN
  -- Server roles and SQL (no user JWT) are unrestricted: seeding, admin.
  IF me IS NULL THEN
    RETURN NEW;
  END IF;
  is_seller_of := afriva.sells_in_order(me, OLD.product_ids);
  IF NEW.order_id <> OLD.order_id OR NEW.product_ids <> OLD.product_ids OR NEW.quantity <> OLD.quantity
     OR NEW.selected_size_details IS DISTINCT FROM OLD.selected_size_details
     OR NEW.user_delivery_address IS DISTINCT FROM OLD.user_delivery_address
     OR NEW.payment_method <> OLD.payment_method OR NEW.subtotal <> OLD.subtotal
     OR NEW.delivery_charge <> OLD.delivery_charge OR NEW.total <> OLD.total
     OR NEW.total_amount <> OLD.total_amount OR NEW.created_by IS DISTINCT FROM OLD.created_by
     OR NEW.created_at <> OLD.created_at THEN
    RAISE EXCEPTION USING ERRCODE = '42501', MESSAGE = 'Order contents can''t be changed';
  END IF;
  -- Dates follow the status and are stamped here, never taken from a browser.
  NEW.packing_date := OLD.packing_date;
  NEW.shipping_date := OLD.shipping_date;
  NEW.delivery_date := OLD.delivery_date;
  IF NEW.status = OLD.status THEN
    RETURN NEW;
  END IF;
  IF is_seller_of AND (
       (OLD.status = 'pending' AND NEW.status = 'packed')
    OR (OLD.status = 'packed' AND NEW.status = 'shipped')
    OR (OLD.status = 'shipped' AND NEW.status = 'delivered')
    OR (OLD.status = 'return requested' AND NEW.status IN ('return accepted', 'return rejected'))) THEN
    NEW.updated_at := NOW();
    IF NEW.status = 'packed' THEN NEW.packing_date := NOW(); END IF;
    IF NEW.status = 'shipped' THEN NEW.shipping_date := NOW(); END IF;
    IF NEW.status = 'delivered' THEN NEW.delivery_date := NOW(); END IF;
    RETURN NEW;
  END IF;
  IF OLD.created_by = me AND OLD.status IN ('delivered', 'completed') AND NEW.status = 'return requested' THEN
    NEW.updated_at := NOW();
    RETURN NEW;
  END IF;
  RAISE EXCEPTION USING ERRCODE = '42501', MESSAGE = format('An order can''t go from %s to %s', OLD.status, NEW.status);
END;
$$;

CREATE TRIGGER afriva_guard_order BEFORE UPDATE ON afriva.orders
  FOR EACH ROW EXECUTE FUNCTION afriva.guard_order();

-- New orders: always pending and owned by the buyer placing them, priced from
-- the product's own size details (never from the browser), and the stock is
-- taken in the same statement, so two buyers can't both get the last one.
-- One order is one line: one product, one size and colour, 1 to 50 pieces.
CREATE FUNCTION afriva.new_order()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
  details   JSONB;
  el        JSONB;
  idx       INTEGER;
  qty       INTEGER;
  left_qty  INTEGER;
  unit      NUMERIC;
  pct       NUMERIC;
  fee       NUMERIC;
  want_hex  TEXT := lower(ltrim(COALESCE(NEW.selected_size_details->>'color_code', ''), '#'));
  want_name TEXT := lower(COALESCE(NEW.selected_size_details->>'color', ''));
BEGIN
  -- Server roles and SQL (no user JWT) insert as given: seeding.
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;
  NEW.status := 'pending';
  NEW.created_by := auth.uid();
  NEW.created_at := NOW();
  NEW.updated_at := NOW();
  NEW.packing_date := NULL;
  NEW.shipping_date := NULL;
  NEW.delivery_date := NULL;

  IF cardinality(NEW.product_ids) <> 1 THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = 'An order holds one product';
  END IF;
  IF COALESCE(NEW.selected_size_details->>'qty', '') !~ '^[0-9]{1,3}$' THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = 'Pick a quantity';
  END IF;
  qty := (NEW.selected_size_details->>'qty')::INTEGER;
  IF qty < 1 OR qty > 50 THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = 'Quantity must be between 1 and 50';
  END IF;

  SELECT size_details INTO details FROM afriva.products WHERE id = NEW.product_ids[1] FOR UPDATE;
  IF details IS NULL THEN
    RAISE EXCEPTION USING ERRCODE = 'P0002', MESSAGE = 'That product is no longer for sale';
  END IF;
  SELECT t.i - 1, t.e INTO idx, el
  FROM jsonb_array_elements(details) WITH ORDINALITY AS t(e, i)
  WHERE t.e->>'size' = NEW.selected_size_details->>'size'
    AND ((want_hex <> '' AND lower(ltrim(t.e->>'color', '#')) = want_hex)
      OR (want_hex = '' AND want_name <> '' AND lower(t.e->>'colorName') = want_name))
  LIMIT 1;
  IF idx IS NULL THEN
    RAISE EXCEPTION USING ERRCODE = 'P0002', MESSAGE = 'That size and colour is not available';
  END IF;

  left_qty := COALESCE(floor(NULLIF(el->>'quantity', '')::NUMERIC)::INTEGER, 0);
  IF left_qty < qty THEN
    RAISE EXCEPTION USING ERRCODE = 'P0001',
      MESSAGE = CASE WHEN left_qty <= 0 THEN 'Out of stock' ELSE format('Only %s left in stock', left_qty) END;
  END IF;

  unit := COALESCE(NULLIF(el->>'price', '')::NUMERIC, 0);
  pct  := LEAST(GREATEST(COALESCE(NULLIF(el->>'discount', '')::NUMERIC, 0), 0), 100);
  fee  := GREATEST(COALESCE(NULLIF(el->>'delivery_fee', '')::NUMERIC, 0), 0);
  NEW.quantity        := qty;
  NEW.subtotal        := round(unit * qty, 2);
  NEW.delivery_charge := fee;
  NEW.total           := round(unit * qty * (1 - pct / 100) + fee, 2);
  NEW.total_amount    := NEW.total;
  NEW.selected_size_details := jsonb_build_object(
    'qty', qty, 'size', el->>'size', 'color', el->>'colorName', 'color_code', '#' || ltrim(el->>'color', '#'));

  UPDATE afriva.products
     SET size_details = jsonb_set(details, ARRAY[idx::TEXT, 'quantity'], to_jsonb((left_qty - qty)::TEXT)),
         total_number_of_sell = total_number_of_sell + qty
   WHERE id = NEW.product_ids[1];
  RETURN NEW;
END;
$$;

CREATE TRIGGER afriva_new_order BEFORE INSERT ON afriva.orders
  FOR EACH ROW EXECUTE FUNCTION afriva.new_order();

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
DO $$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'afriva' LOOP
    EXECUTE format('ALTER TABLE afriva.%I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;
END $$;

-- Buyers: own profile; sellers see buyers (orders, returns). Reviews carry
-- the reviewer's name themselves, so no profile is ever public.
CREATE POLICY users_read ON afriva.users FOR SELECT TO authenticated
  USING (uid = auth.uid() OR afriva.is_seller(auth.uid()));
CREATE POLICY users_insert ON afriva.users FOR INSERT TO authenticated WITH CHECK (uid = auth.uid());
-- Closing an account is a soft delete (isactive = false); the shared demo
-- accounts (app_metadata.no_delete) can't be closed.
CREATE POLICY users_update ON afriva.users FOR UPDATE TO authenticated USING (uid = auth.uid())
  WITH CHECK (uid = auth.uid() AND (isactive OR NOT COALESCE((auth.jwt()->'app_metadata'->>'no_delete')::BOOLEAN, FALSE)));

CREATE POLICY address_own ON afriva.address FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY address_seller_read ON afriva.address FOR SELECT TO authenticated USING (afriva.is_seller(auth.uid()));

CREATE POLICY sellers_read ON afriva.sellers FOR SELECT TO anon, authenticated USING (TRUE);
CREATE POLICY sellers_insert ON afriva.sellers FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY sellers_update ON afriva.sellers FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY brands_read ON afriva.brands FOR SELECT TO anon, authenticated USING (TRUE);
CREATE POLICY brands_write ON afriva.brands FOR ALL TO authenticated USING (seller_id = auth.uid()) WITH CHECK (seller_id = auth.uid());

CREATE POLICY categories_read ON afriva.categories FOR SELECT TO anon, authenticated USING (TRUE);

CREATE POLICY products_read ON afriva.products FOR SELECT TO anon, authenticated USING (TRUE);
CREATE POLICY products_write ON afriva.products FOR ALL TO authenticated
  USING (seller_id = auth.uid()) WITH CHECK (seller_id = auth.uid() AND afriva.is_seller(auth.uid()));

CREATE POLICY cart_own ON afriva.cart FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY orders_buyer_read ON afriva.orders FOR SELECT TO authenticated USING (created_by = auth.uid());
CREATE POLICY orders_seller_read ON afriva.orders FOR SELECT TO authenticated USING (afriva.sells_in_order(auth.uid(), product_ids));
CREATE POLICY orders_insert ON afriva.orders FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY orders_update ON afriva.orders FOR UPDATE TO authenticated
  USING (created_by = auth.uid() OR afriva.sells_in_order(auth.uid(), product_ids));

CREATE POLICY returns_buyer ON afriva.return_requests FOR SELECT TO authenticated USING (created_by = auth.uid());
CREATE POLICY returns_insert ON afriva.return_requests FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid() AND EXISTS (SELECT 1 FROM afriva.orders o WHERE o.order_id = return_requests.order_id AND o.created_by = auth.uid()));
CREATE POLICY returns_seller ON afriva.return_requests FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM afriva.orders o WHERE o.order_id = return_requests.order_id AND afriva.sells_in_order(auth.uid(), o.product_ids)));
CREATE POLICY returns_seller_update ON afriva.return_requests FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM afriva.orders o WHERE o.order_id = return_requests.order_id AND afriva.sells_in_order(auth.uid(), o.product_ids)));

CREATE POLICY reviews_read ON afriva.reviews FOR SELECT TO anon, authenticated USING (TRUE);
CREATE POLICY reviews_insert ON afriva.reviews FOR INSERT TO authenticated
  WITH CHECK (review_by = auth.uid() AND (order_id IS NULL OR EXISTS (SELECT 1 FROM afriva.orders o WHERE o.order_id = reviews.order_id AND o.created_by = auth.uid())));

CREATE POLICY payment_methods_own ON afriva.payment_methods FOR ALL TO authenticated USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());
CREATE POLICY payment_history_own ON afriva.payment_history FOR SELECT TO authenticated USING (created_by = auth.uid());
CREATE POLICY payment_history_insert ON afriva.payment_history FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());

CREATE POLICY promocode_own ON afriva.promocode FOR SELECT TO authenticated USING (assignto = auth.uid());
-- referby, subscribe_newsletter and email_otps: no browser policies (functions and server routes only).

-- ────────────────────────────────────────────────────────────
-- GRANTS
-- ────────────────────────────────────────────────────────────
GRANT USAGE ON SCHEMA afriva TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA afriva TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA afriva TO anon, authenticated, service_role;
GRANT EXECUTE ON ALL ROUTINES IN SCHEMA afriva TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA afriva GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA afriva GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- ────────────────────────────────────────────────────────────
-- STORAGE: public buckets (prefixed, the hub's bucket names are shared)
-- ────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public) VALUES
  ('afriva-product-images', 'afriva-product-images', TRUE),
  ('afriva-brand-images',   'afriva-brand-images',   TRUE),
  ('afriva-profile-images', 'afriva-profile-images', TRUE),
  ('afriva-review-media',   'afriva-review-media',   TRUE),
  ('afriva-return-media',   'afriva-return-media',   TRUE)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS afriva_media_insert ON storage.objects;
CREATE POLICY afriva_media_insert ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('afriva-product-images','afriva-brand-images','afriva-profile-images','afriva-review-media','afriva-return-media'));
DROP POLICY IF EXISTS afriva_media_update ON storage.objects;
CREATE POLICY afriva_media_update ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'afriva-profile-images' AND owner = auth.uid());
DROP POLICY IF EXISTS afriva_media_read ON storage.objects;
CREATE POLICY afriva_media_read ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id IN ('afriva-product-images','afriva-brand-images','afriva-profile-images','afriva-review-media','afriva-return-media'));

COMMIT;
