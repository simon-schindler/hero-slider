import { HeroSlider } from "./components/HeroSlider";
export default function Home() {
  const pictures=[
    {src: '/blue.svg', alt: 'blue'},
    {src: '/gray.svg', alt: 'gray'},
    {src: '/white.svg', alt: 'white'},
    
  ]
  return (
    <section>
      <HeroSlider pictures={pictures}/>
    </section>
  );
}
