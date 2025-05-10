import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveOrders, fetchCompletedOrders } from "@/redux/features/order/orderThunk";
import OrderField from "@/components/dropdowns/OrderField";
import Image from "next/image";

const OrderList = ({ setState, setOrderDetail }) => {
  const dispatch = useDispatch();
  const { activeOrders, completedOrders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(fetchActiveOrders(user?.id));
      await dispatch(fetchCompletedOrders(user?.id));
      setLoading(false);
    };
    fetchOrders();
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (filter === "active") {
      setFilteredOrders(activeOrders);
    } else if (filter === "completed") {
      setFilteredOrders(completedOrders);
    }
    setCurrentPage(1); // Reset to the first page when filter changes
  }, [filter, activeOrders, completedOrders]);

  const navigateToOrderPage = (order) => {
    setOrderDetail(order);
    setState("details");
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-[100%] p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold my-5">My Orders</h1>
        <div className="flex items-center gap-3">
          <p className="text-grayDark">Status</p>
          <OrderField onFilterChange={setFilter} />
        </div>
      </div>
      <hr />
      {loading ? (
        <p>Loading orders...</p>
      ) : currentOrders.length > 0 ? (
        currentOrders.map((order, index) => (
          <div
            key={order?.order_id || index}
            className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 lg:w-[100%]"
          >
            <div className="flex justify-between items-center w-full h-[90px]">
              <div className="flex gap-3 items-center">
                <div>
                  <Image
                    alt="Product Image"
                    width={90}
                    height={90}
                    className="object-cover rounded-[10px]"
                    src={order?.products[0]?.product_image[0] || "/images/order-avatar.jpeg"}
                  />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <p className="font-medium">Order # {order?.order_id}</p>
                  {order?.products.map((item, index) => (
                    <p key={index} className="text-sm">
                      {order?.quantity} {item?.name}
                    </p>
                  ))}
                  <div className="px-5 py-1 bg-tagGray border rounded-[30px] border-borderTag">
                    {order.status}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between h-full">
                <div className="rounded-[4px] px-3 py-1 bg-whiteLight">
                  {order?.products?.length || 0} items
                </div>
                <button
                  onClick={() => navigateToOrderPage(order)}
                  className="rounded-[4px] bg-buttonGradient px-8 py-2 text-white"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
      {
        loading ? null :

          <div className="flex justify-between items-center mt-5">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-green-600 text-white"}`}
            >
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-green-500 text-white"}`}
            >
              Next
            </button>
          </div>
      }
    </div>
  );
};

export default OrderList;