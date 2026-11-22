import type { IconName } from "@/components/ui/Icon";

/** Content for the "Contact Us" page. */

export const office = {
  mapQuery: "London Eye, London, United Kingdom",
  details: [
    { value: "175 Mittchell River Apt.616, US.", label: "Office Headquarters" },
    { value: "+123 66 000 888/ 66 000 999", label: "Phone number", href: "tel:+12366000888" },
    { value: "contact@example.com", label: "Our email", href: "mailto:contact@example.com" },
    { value: "Monday - Saturday", label: "Working time" },
  ],
};

export interface SupportPerson {
  name: string;
  role: string;
  avatar: string;
  phone: string;
}

export const supportTeam: SupportPerson[] = [
  { name: "Carl Lee", role: "Chief Officer", avatar: "/images/contact/support-1.png", phone: "" },
  { name: "Luna Jones", role: "Manager Support", avatar: "/images/contact/support-2.png", phone: "" },
  { name: "Tonny Parker", role: "Chief Officer", avatar: "/images/contact/support-4.png", phone: "" },
];

export const supportSocials: { icon: IconName; label: string }[] = [
  { icon: "facebook-f", label: "Facebook" },
  { icon: "twitter", label: "Twitter" },
  { icon: "instagram", label: "Instagram" },
  { icon: "pinterest-p", label: "Pinterest" },
];
