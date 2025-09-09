// SocialBar.jsx
import './SocialBar.css';
import linkedinIcon from './icons/linkedin_icon.png';
import twitter_icon from './icons/twitter_icon.png';
import facebook_icon from './icons/facebook_icon.png';
import instagram_icon from './icons/instagram_icon.png';
const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/cyano-tracker-992002140/', icon: linkedinIcon },
  { name: 'X (Twitter)', href: 'https://x.com/CyanoTracker', icon: twitter_icon },
  { name: 'Facebook', href: 'https://www.facebook.com/cyanotracker', icon: facebook_icon },
  { name: 'Instagram', href: 'https://www.instagram.com/cyanotracker/', icon: instagram_icon },
];

export default function SocialBar() {
  return (
    <nav className="social-bar" aria-label="Social links">
      {socials.map(s => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-chip"
          title={s.name}
        >
          <img src={s.icon} alt="" aria-hidden="true" />
          <span>{s.name}</span>
        </a>
      ))}
    </nav>
  );
}
