import React from "react";
import Routing from "../../policy/Routing";
import Article from "../../policy/Article";

const Return = () => {
  const data = [
    {
      id: "policy",
      name: "1. Policy",
      updated: "Last updated on: March 1, 2023",
      content: `Welcome to Shopify! By signing up for a Shopify Account (as defined in Section 1) or by using any Shopify Services (as defined below), you are agreeing to be bound by the following terms and conditions (the "Terms of Service").<br /><br />
      As used in these Terms of Service, "we", "us", "our" and "Shopify" means the applicable Shopify Contracting Party (as defined in Section 13 below), and "you" means the Shopify User (if registering for or using a Shopify Service as an individual), or the business employing the Shopify User (if registering for or using a Shopify Service as a business) and any of its affiliates.<br /><br />
      Shopify provides a complete commerce platform that enables merchants to unify their commerce activities. Among other features, this platform includes a range of tools for merchants to build and customize online`,
    },
    {
      id: "request",
      name: "2. Request",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "shopifyRights",
      name: "3. Shopify Rights",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "yourResponsibility",
      name: "4. Your Responsibilities",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "feeAndTaxPayment",
      name: "5. Payment of Fees and Taxes",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "confidentiality",
      name: "6. Confidentiality",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "limitationOfLiabilityAndIdentification",
      name: "7. Limitation of Liability and Identification",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
    {
      id: "intellectualPropertyAndMaterials",
      name: "8. Intellectual Property and Your Materials",
      updated: "Last updated on: March 1, 2023",
      content:
        "These Terms & Conditions govern your use of the site and outline the rights and responsibilities of both the users and the company. By accessing the site, you agree to follow the guidelines regarding purchases, payments, shipping, and returns. We ensure that your privacy and data security are safeguarded, and we maintain strict policies on the protection and usage of personal information. All intellectual property on the site remains the sole property of the company and cannot be reproduced or used without prior permission.<br /><br />Additionally, the terms limit the company’s liability in the event of any issues or damages arising from the use of the site. Disputes will be handled under the governing law specified within the terms. Users will be informed of any changes or updates to these terms as needed, and the process for making such changes is also described. If you have any concerns or questions, our contact information is provided for further assistance.",
    },
  ];

  return (
    <div className="w-full flex flex-col pt-28 lg:px-[100px] md:px-8 px-4 ">
      <h1 className="text-4xl font-bold mx-5 md:mx-0">Return Policy</h1>
      <div className="flex items-center relative justify-between">
        <Routing data={data} />
        <Article data={data} />
      </div>
    </div>
  );
};

export default Return;
