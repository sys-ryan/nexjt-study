import Image from "next/image";
import classes from "./Hero.module.css";

const Hero = (props) => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/profile.png" alt="profile image" width={300} height={300} />
      </div>
      <h1>Hi, I'm Ryan</h1>
      <p>I blog about web development - especially web development frameworks.</p>
    </section>
  );
};

export default Hero;
