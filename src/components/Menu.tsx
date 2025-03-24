
import React, { useEffect, useRef, useState } from "react";
import { menuData } from "../data/menuData";
import MenuSection from "./MenuSection";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Menu: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(menuData[0].id);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const menuRef = useRef<HTMLDivElement>(null);

  // Set up intersection observer to track which section is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -40% 0px", // Adjusted for better detection
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the first section that is intersecting
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Sort by Y position to get the topmost visible section
        const sortedEntries = visibleEntries.sort((a, b) => {
          const rectA = a.boundingClientRect;
          const rectB = b.boundingClientRect;
          return rectA.top - rectB.top;
        });
        
        const newActiveSection = sortedEntries[0].target.id;
        console.log("New active section:", newActiveSection);
        setActiveSection(newActiveSection);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section elements
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) {
        console.log("Observing section:", ref.id);
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Scroll to section when nav item is clicked
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId); // Immediately update active section
    }
  };

  return (
    <div className="menu-container pb-28" ref={menuRef}>
      {/* Category Navigation */}
      <div className="sticky top-[144px] z-30 bg-[#F2E8D5] py-2 -mx-4 px-4 shadow-sm border-y border-[#E6D7B8]">
        <NavigationMenu className="max-w-full w-full">
          <NavigationMenuList className="flex justify-between overflow-x-auto space-x-1 w-full no-scrollbar">
            {menuData.map((section) => (
              <NavigationMenuItem key={`nav-${section.id}`}>
                <NavigationMenuLink 
                  className={cn(
                    "px-4 py-2 text-gray-800 rounded-md whitespace-nowrap cursor-pointer text-sm font-medium transition-colors",
                    activeSection === section.id 
                      ? "bg-[#D9B26A] text-white font-semibold"
                      : "hover:bg-[#D9B26A]/10"
                  )}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Menu Sections */}
      <div className="mt-4">
        {menuData.map((section) => (
          <div 
            key={section.id} 
            id={section.id}
            ref={(el) => (sectionRefs.current[section.id] = el)}
          >
            <MenuSection section={section} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
