// import Image from "next/image";

import Dash from "./_components/Molecule/Dash";
import Navbar from "./_components/Molecule/Navbar";

export default function Home() {
  return (
    <>
      <div className="h-screen w-full overflow-hidden flex ">
        <div className="h-full w-[20vw] shadow">
          <Navbar />
        </div>
        <div className="h-full w-[80vw] ">
          <Dash />
        </div>
      </div>
    </>
  );
}
