import { useEffect } from "react";

const VisitorTracker = () => {
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        const visitorInfo = {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
          referrer: document.referrer || "Direct",
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        };

        // Send to Rails Mailer endpoint
        fetch("https://your-backend-domain.com/api/send_visit_notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(visitorInfo)
        }).catch(err => console.error("Notification failed:", err));
      });
  }, []);

  return null;
};

export default VisitorTracker;