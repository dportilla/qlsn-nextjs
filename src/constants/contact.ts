import {
  InstagramIcon,
  Linkedin02Icon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons';

export const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/qualysyn/',
    icon: InstagramIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/qual-syn/',
    icon: Linkedin02Icon,
  },
  {
    name: 'Whatsapp',
    href: 'https://wa.me/56979644747',
    icon: WhatsappIcon,
  },
  {
    name: 'Email',
    href: 'mailto:contacto@qualysyn.cl',
    icon: MailIcon,
  },
] as const;

export const CONTACT_INFO = [
  {
    name: 'Email',
    href: 'mailto:contacto@qualysyn.cl',
    icon: MailIcon,
  },
  {
    name: 'Phone',
    href: 'tel:+56979644747',
    icon: PhoneIcon,
  },
  {
    name: 'Address',
    href: 'https://goo.gl/maps/4Z5z5Z5Z5Z5Z5Z5Z5',
    address: 'Providencia, Santiago, Chile',
    icon: MapPinIcon,
  },
] as const;
