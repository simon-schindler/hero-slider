import { HeroSlider } from "./components/HeroSlider";
export default function Home() {
  const pictures=[
    {src: '/hero-slider/blue.svg', alt: 'blue'},
    {src: '/hero-slider/gray.svg', alt: 'gray'},
    {src: '/hero-slider/white.svg', alt: 'white'},
    
  ]
  return (
    <section>
      <HeroSlider pictures={pictures}/>
    </section>
  );
}
