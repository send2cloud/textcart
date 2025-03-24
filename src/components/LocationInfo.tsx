
import React from "react";
import { MapPin, Phone } from "lucide-react";
import { restaurantInfo } from "../data/menuData";
import { getSMSLink } from "../utils/cartUtils";

const LocationInfo: React.FC = () => {
  const mapSrc = `https://www.google.com/maps/embed/v1/place?q=${restaurantInfo.location.lat},${restaurantInfo.location.lng}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;
  
  const smsLink = getSMSLink(restaurantInfo.phone, "Hello! I'd like to place an order.");

  return (
    <div className="bg-secondary/50 rounded-xl p-6 my-8">
      <h2 className="text-2xl font-semibold mb-4">Contact & Location</h2>
      
      <div className="space-y-4 mb-6">
        <a 
          href={smsLink} 
          className="flex items-center gap-3 text-primary hover:underline"
        >
          <Phone className="h-5 w-5" />
          <span>{restaurantInfo.phone}</span>
        </a>
        
        <div className="flex items-center gap-3 text-foreground">
          <MapPin className="h-5 w-5" />
          <span>{restaurantInfo.address}</span>
        </div>
      </div>
      
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Restaurant Location"
        ></iframe>
      </div>
    </div>
  );
};

export default LocationInfo;
