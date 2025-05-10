import React from "react";
import Routing from "../../policy/Routing";
import Article from "../../policy/Article";

const Terms = () => {
  const data = [
    {
      id: "introduction",
      name: "Introduction",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "usage",
      name: "Use of the Site",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "purchases",
      name: "Purchases & Payments",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "shipping",
      name: "Shipping & Delievery",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "returns",
      name: "Returns & Exchanges",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "privacy",
      name: "Privacy & Security",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "intellect",
      name: "Intellectual Property",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "liability",
      name: "Limitation of Liability",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "responsibility",
      name: "User Responsibilities",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "law",
      name: "Governing Law",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "changes",
      name: "Changes to the Terms",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },

    {
      id: "contact",
      name: "Contact Information",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
  ];

  return (
    <div className="w-full flex flex-col pt-28 lg:px-[100px] md:px-8 px-4 ">
      <h1 className="text-4xl font-bold mx-5 md:mx-0">Terms & Condtions</h1>
      <div className="flex items-center relative justify-between">
        <Routing data={data} />
        <Article data={data} />
      </div>
    </div>
  );
};

export default Terms;
