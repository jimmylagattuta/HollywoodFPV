import React, { useEffect } from "react";

const VisitorTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const geoRes = await fetch("https://ipapi.co/json");
        const geoData = await geoRes.json();

        const payload = {
          ip: geoData.ip,
          city: geoData.city,
          region: geoData.region,
          country: geoData.country_name,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        };

        await fetch("http://lightningseo.dev/api/send_visit_notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.error("Visitor tracking failed:", error);
      }
    };

    const delay = setTimeout(trackVisit, 1000); // 1-second delay
    return () => clearTimeout(delay);
  }, []);

  return null; // nothing is rendered
};

export default VisitorTracker;
