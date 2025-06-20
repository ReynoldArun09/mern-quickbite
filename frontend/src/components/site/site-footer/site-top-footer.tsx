import CustomToolTip from "@/components/common/custom-tooltip";
import { footerData } from "@/constants/footer-data";
import { Mail, MapPin, Phone } from "lucide-react";

const FooterSection = ({ title, items, ariaLabel }: { title: string; items: string[]; ariaLabel: string }) => (
  <div className="space-y-2" aria-label={ariaLabel}>
    <p className="font-bold text-2xl">{title}</p>
    <ul className="space-y-1 cursor-pointer">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

export default function SiteFooterTop() {
  const { contact, socialLinks, menu, about, legal } = footerData;
  return (
    <div className="flex flex-wrap justify-between gap-x-8 gap-y-6 border-y py-4">
      <div className="space-y-4">
        <p className="font-bold text-2xl">Have a Questions?</p>
        <div className="flex items-start gap-2" aria-label="Address">
          <MapPin className="hover:text-primary" />
          <span>{contact.address}</span>
        </div>
        <div className="flex items-center gap-2" aria-label="Phone Number">
          <Phone className="hover:text-primary" />
          <span>{contact.phone}</span>
        </div>
        <div className="flex items-center gap-2" aria-label="Email Address">
          <Mail className="hover:text-primary" />
          <span>{contact.email}</span>
        </div>

        <div className="flex gap-5 pt-3">
          {socialLinks?.map((social) => (
            <CustomToolTip content={social.title} key={social.title}>
              <social.icon />
            </CustomToolTip>
          ))}
        </div>
      </div>

      <FooterSection title="Menu" items={menu} ariaLabel="Footer Navigation Menu" />
      <FooterSection title="About" items={about} ariaLabel="About Links" />
      <FooterSection title="Legal" items={legal} ariaLabel="Legal Links" />
    </div>
  );
}
