import React from "react";

const Article = ({ data }) => {
  return (
    <div className="md:w-[70%] w-full flex mt-5 md:mt-28 mx-5 md:mx-0 flex-col">
      {data.map(({ updated, id, content }) => (
        <article
          key={id}
          id={id}
          className="bg-[#4A3AFF0D] rounded-lg p-10 mb-10"
        >
          <h3 className="text-lg font-semibold mb-10">{updated}</h3>
          <p
            className="text-lg font-medium text-graytoc"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      ))}
    </div>
  );
};

export default Article;
