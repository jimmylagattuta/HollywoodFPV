import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./FAQ.css";
import Contact from "./Contact"; // Adjust path as necessary
import FooterComponent from "../../sections/FooterComponent"; // Adjust path as necessary

// In-depth FAQ data for LightningSEO.dev covering SEO, web development, mobile apps, and Apple Watch app development
const faqData = [
  {
    question: "What is SEO and why is it important for my business?",
    answer: "SEO (Search Engine Optimization) improves your website's visibility on search engines, driving more organic traffic, increasing brand awareness, and ultimately boosting conversions. It involves optimizing content, site structure, and technical aspects to rank higher for targeted keywords."
  },
  {
    question: "What services does LightningSEO.dev offer?",
    answer: "We offer a full suite of digital services including on-page SEO, technical SEO, local SEO, content strategy, link building, comprehensive SEO audits, and consulting, as well as custom website development, web application development, mobile app development, and Apple Watch app development."
  },
  {
    question: "How does on-page SEO work?",
    answer: "On-page SEO focuses on optimizing individual web pages—by refining content, meta tags, headings, and internal links—to make them more search engine friendly and relevant to specific keywords, thus improving your rankings."
  },
  {
    question: "What is technical SEO?",
    answer: "Technical SEO involves improving your website’s backend structure such as site speed, mobile responsiveness, secure connections (HTTPS), and proper indexing to ensure search engines can crawl and rank your site efficiently."
  },
  {
    question: "How do you approach local SEO?",
    answer: "Our local SEO strategy includes optimizing your Google Business Profile, ensuring NAP consistency across directories, and targeting localized keywords, so you can attract more customers in your service area."
  },
  {
    question: "What is content marketing and how does it relate to SEO?",
    answer: "Content marketing involves creating high-quality, valuable content that engages your audience and naturally incorporates targeted keywords. It helps drive organic traffic, builds brand authority, and supports overall SEO efforts."
  },
  {
    question: "Why is link building important?",
    answer: "Link building involves acquiring high-quality backlinks from reputable websites. These links act as endorsements that improve your website’s authority and rankings, signaling to search engines that your content is valuable."
  },
  {
    question: "What does an SEO audit include?",
    answer: "An SEO audit is a comprehensive analysis of your website’s performance. It examines technical issues, on-page factors, backlink quality, and local SEO elements, and provides actionable recommendations to improve your rankings and user experience."
  },
  {
    question: "Do you offer free SEO audits?",
    answer: "Yes, we provide a complimentary initial SEO audit to assess your website’s current performance and identify key areas for improvement, helping you understand the potential benefits of our services."
  },
  {
    question: "What is SEO consulting?",
    answer: "SEO consulting involves personalized guidance where our experts analyze your website and digital presence, then provide tailored strategies and actionable recommendations to help you achieve better search engine performance."
  },
  {
    question: "How long does it take to see results from SEO?",
    answer: "SEO is a long-term strategy. Typically, noticeable results can be expected within 3-6 months, though this may vary depending on competition, current website health, and the strategies implemented."
  },
  {
    question: "How do you measure the success of an SEO campaign?",
    answer: "We measure success through key performance indicators (KPIs) like organic traffic, keyword rankings, conversion rates, bounce rates, and the quality of backlinks, with regular reporting to track progress."
  },
  {
    question: "What is website development and how can it benefit my business?",
    answer: "Website development involves creating a custom, responsive, and user-friendly website that represents your brand. A well-developed site improves user experience, supports SEO, and drives conversions."
  },
  {
    question: "What is a responsive website?",
    answer: "A responsive website adapts to different screen sizes and devices, ensuring a seamless user experience on desktops, tablets, and smartphones, which is crucial for both user engagement and SEO."
  },
  {
    question: "What are web applications?",
    answer: "Web applications are dynamic, interactive websites that function like software applications. They offer advanced functionality such as user accounts, data processing, and interactive features beyond static content."
  },
  {
    question: "Why should I invest in mobile app development?",
    answer: "Mobile app development allows you to reach customers directly on their smartphones, offering enhanced engagement, personalized experiences, and new revenue opportunities, whether through native or cross-platform solutions."
  },
  {
    question: "Do you develop native or cross-platform mobile apps?",
    answer: "We develop both native mobile apps (for iOS and Android) and cross-platform apps using frameworks like React Native, based on your project’s needs, timeline, and budget."
  },
  {
    question: "What is Apple Watch app development?",
    answer: "Apple Watch app development focuses on creating companion or standalone apps for the Apple Watch, offering quick access to information and features directly on the wrist using watchOS and SwiftUI."
  },
  {
    question: "How do Apple Watch apps enhance user experience?",
    answer: "Apple Watch apps provide glanceable information, quick interactions, and notifications directly on the user’s wrist. They complement iOS apps by offering convenience and timely alerts without requiring the user to pull out their phone."
  },
  {
    question: "What is App Store Optimization (ASO)?",
    answer: "ASO is the process of optimizing your app’s listing on the Apple App Store and Google Play Store to improve its visibility and increase downloads. It involves optimizing titles, descriptions, keywords, and visuals."
  },
  {
    question: "How do you integrate SEO with web development?",
    answer: "We build websites that are not only visually appealing but also fully optimized for SEO from the ground up, ensuring proper structure, fast load times, responsive design, and clean code."
  },
  {
    question: "What is a Content Delivery Network (CDN) and how does it help?",
    answer: "A CDN is a network of distributed servers that deliver web content based on the user’s geographic location, speeding up load times and improving the overall performance of your website."
  },
  {
    question: "How important is site speed for SEO?",
    answer: "Site speed is critical for SEO. Faster loading pages provide a better user experience, reduce bounce rates, and are favored by search engines in rankings. We optimize your site to ensure fast load times."
  },
  {
    question: "What role does mobile-friendliness play in SEO?",
    answer: "With mobile-first indexing, Google prioritizes mobile-friendly websites. A mobile-optimized site not only improves user experience on smartphones and tablets but also helps improve your search rankings."
  },
  {
    question: "How do you handle website security?",
    answer: "We implement best practices such as HTTPS, regular security audits, and secure coding techniques to protect your website from vulnerabilities and ensure the safety of user data."
  },
  {
    question: "What is structured data and why should I use it?",
    answer: "Structured data uses schema markup to help search engines understand the content of your site better. It can enable rich snippets (like FAQs) in search results, enhancing visibility and click-through rates."
  },
  {
    question: "What is a landing page and how does it work?",
    answer: "A landing page is a standalone web page designed for a specific marketing or advertising campaign. Its goal is to convert visitors into leads or customers by focusing on a single call-to-action."
  },
  {
    question: "Can you help improve my website's conversion rate?",
    answer: "Yes, we optimize websites to improve conversion rates by enhancing design, streamlining navigation, optimizing call-to-actions, and ensuring a seamless user experience."
  },
  {
    question: "How do you conduct keyword research?",
    answer: "We use industry-leading tools to identify the most relevant and high-impact keywords for your business. Our research analyzes search volume, competition, and user intent to form a strategic keyword plan."
  },
  {
    question: "What is a backlink profile and why is it important?",
    answer: "A backlink profile is the collection of all backlinks pointing to your website. A strong profile with quality, relevant links signals trust and authority to search engines, which can improve your rankings."
  },
  {
    question: "Do you offer ongoing SEO support after project completion?",
    answer: "Yes, we offer continuous support, monitoring, and maintenance services to ensure your website remains optimized and competitive in search results over time."
  },
  {
    question: "How do you stay updated with the latest SEO trends?",
    answer: "Our team continuously follows industry blogs, attends conferences, and uses the latest tools and techniques to ensure we are always at the forefront of SEO trends and best practices."
  },
  {
    question: "What industries can benefit from your digital services?",
    answer: "Our services are versatile and can benefit businesses across various industries including retail, healthcare, finance, technology, hospitality, and more."
  },
  {
    question: "How do you price your SEO and digital services?",
    answer: "Our pricing models are flexible. We offer project-based pricing and monthly retainers depending on the scope of work, ensuring our services are cost-effective and provide a strong ROI."
  },
  {
    question: "What is the typical turnaround time for a website project?",
    answer: "Turnaround time depends on the project scope, but a standard custom website project typically takes between 6 to 12 weeks from planning to launch."
  },
  {
    question: "What makes a successful digital marketing strategy?",
    answer: "A successful strategy integrates SEO, quality content, social media, and data analytics. It is built on understanding your target audience, clear goals, and continuous measurement and optimization."
  },
  {
    question: "How do you handle project communication and updates?",
    answer: "We maintain transparent communication with regular updates, progress reports, and scheduled meetings, ensuring you’re informed and involved throughout every project stage."
  },
  {
    question: "What is the benefit of custom app development?",
    answer: "Custom app development tailors solutions specifically to your business needs, resulting in a unique, scalable, and efficient application that enhances user experience and drives business growth."
  },
  {
    question: "How does cross-platform mobile app development work?",
    answer: "Cross-platform development uses a single codebase (often with frameworks like React Native) to build apps for both iOS and Android, reducing development time and cost while maintaining quality."
  },
  {
    question: "What is the process for Apple Watch app development?",
    answer: "Our Apple Watch app development process involves designing a glanceable, user-friendly interface, developing with SwiftUI and WatchKit, and ensuring seamless integration with your iPhone app if needed."
  },
  {
    question: "Can I request revisions during the project?",
    answer: "Yes, we value your feedback and offer revision cycles during our projects to ensure that the final product meets your expectations and business needs."
  },
  {
    question: "How do you ensure my project stays on schedule?",
    answer: "We use project management best practices and clear milestones. Regular communication and progress tracking help ensure that your project is completed on time."
  },
  {
    question: "What support do you offer after project launch?",
    answer: "Post-launch, we provide maintenance, updates, and ongoing support to ensure your website or app continues to perform optimally and remains secure."
  },
  {
    question: "How can I improve my website's user engagement?",
    answer: "Improving user engagement involves optimizing design, content, and navigation to create a seamless experience. We recommend regular updates, interactive features, and fast load times to keep visitors engaged."
  },
  {
    question: "What role does social media play in digital marketing?",
    answer: "Social media amplifies your digital presence by driving engagement, brand awareness, and referral traffic. Integrating social media with SEO and content strategies creates a holistic approach to digital marketing."
  },
  {
    question: "Can you help with email marketing campaigns?",
    answer: "Yes, we can design and implement email marketing campaigns that nurture leads, build customer loyalty, and drive conversions by integrating them with your overall digital strategy."
  },
  {
    question: "What is conversion rate optimization (CRO)?",
    answer: "CRO is the process of increasing the percentage of website visitors who complete a desired action (such as filling out a form or making a purchase) by improving site design, content, and user experience."
  },
  {
    question: "How do you ensure my website is accessible?",
    answer: "We follow accessibility best practices (such as proper alt text, clear navigation, and contrast ratios) to ensure that your website is usable for people with disabilities and meets legal guidelines."
  },
  {
    question: "Do you integrate analytics into your projects?",
    answer: "Yes, we set up tools like Google Analytics and Search Console to monitor your website’s performance, track user behavior, and measure the effectiveness of your digital marketing efforts."
  },
  {
    question: "How can I schedule a consultation with LightningSEO.dev?",
    answer: "Simply reach out via our contact form or email jimmy.lagattuta@gmail.com to schedule a free consultation and SEO audit to discuss your project needs."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // Build FAQ structured data for rich snippets
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>FAQs - LightningSEO.dev</title>
        <meta name="description" content="Find in-depth answers to frequently asked questions about our SEO, web development, mobile app, and Apple Watch app services at LightningSEO.dev." />
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>
      
      <section className="faqs-section">
        <h1 className="faqs-title">Frequently Asked Questions</h1>
        <p className="faqs-subtitle">
          Please reach out at{" "}
          <a href="mailto:jimmy.lagattuta@gmail.com">jimmy.lagattuta@gmail.com</a> if you can’t find an answer.
        </p>
        <div className="faqs-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                {item.question}
                <span className="faq-toggle">{openIndex === index ? "–" : "+"}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      <Contact />
      <FooterComponent />
    </>
  );
};

export default FAQ;