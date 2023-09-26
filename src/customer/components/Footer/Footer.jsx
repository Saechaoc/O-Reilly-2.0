import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { socialMedia } from "./SocialMedia";
import { footerLinks } from "./FooterLinks";

const Footer = () => {
  return (
    <footer className="bg-black text-white text center max-container p-20">
      <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
        <div className="flex flex-col items-start">
          <a href="/">
            <img
              src="https://corporate.oreillyauto.com/onlineapplication/images/logo.png?version=1"
              alt="logo"
              width={300}
              height={200}
              className="m-0"
            />
          </a>
          <p className="mt-6 text-base leading-7 font-montserrat text-white sm:max-w-sm">
            Better Parts, better prices, everyday on auto parts and accessories.
            Find a store near you, view our current ad, see current promotions,
            and more.
          </p>
          <div className="flex items-center gap-5 mt-8">
            {socialMedia.map((icon) => (
              <div
                className="flex justify-center items-center w-12 h-12 bg-white rounded-full"
                key={icon.alt}
              >
                <img src={icon.src} alt={icon.alt} width={24} height={24} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap px-20">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-montserrat text-2xl leading-normal font-medium mb-6 text-white">
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    className="mt-3 font-montserrat text-base leading-normal text-white hover:text-slate-gray"
                    key={link.name}
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// export const Footer = () => {
//   return (
//     <div>
//       <Grid
//         className="bg-black text-white text center"
//         container
//         sx={{ bgcolor: "black", color: "white", py: 3 }}
//       >
//         <Grid item xs={12} sm={6} md={3} lg={1}>
//           <Typography clasName="pb-5" variant="h6">
//             Company
//           </Typography>
//                   <Button clasName="pb-5" variant="h6" gutterBottom>About</Button>
//                   <Button clasName="pb-5" variant="h6" gutterBottom>Blog</Button>
//                   <Button clasName="pb-5" variant="h6" gutterBottom>Press</Button>
//                   <Button clasName="pb-5" variant="h6" gutterBottom>About</Button>
//                   <Button clasName="pb-5" variant="h6" gutterBottom>About</Button>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };
