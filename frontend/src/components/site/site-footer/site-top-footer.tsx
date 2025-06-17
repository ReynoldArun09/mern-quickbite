import { footerData } from "@/constants/footer-data";
import { Mail, MapPin, Phone } from "lucide-react";
import CustomToolTip from "../../common/custom-tooltip";

export default function SiteFooterTop() {
  return (
    <div className="flex flex-wrap justify-between gap-x-8 gap-y-6 border-y py-4">
      <div className="space-y-4">
        <h1 className="font-bold text-2xl">Have a Questions?</h1>
        <h2 className="flex gap-2 items-start">
          <MapPin className="hover:text-primary mt-1" />
          <span className="block">{footerData.contact.address}</span>
        </h2>
        <h3 className="flex gap-2 items-center">
          <Phone className="hover:text-primary" /> {footerData.contact.phone}
        </h3>
        <h4 className="flex gap-2 items-center">
          <Mail className="hover:text-primary" /> {footerData.contact.email}
        </h4>

        <div className="flex gap-5 pt-3">
          {footerData.socialLinks?.map((social) => (
            <CustomToolTip content={social.title} key={social.title}>
              <social.icon />
            </CustomToolTip>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="font-bold text-2xl">Menu</h1>
        <ul className="space-y-1 cursor-pointer">
          {footerData.menu.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h1 className="font-bold text-2xl">About</h1>
        <ul className="space-y-2 cursor-pointer">
          {footerData.about.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h1 className="font-bold text-2xl">Legal</h1>
        <ul className="space-y-2 cursor-pointer">
          {footerData.legal.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
