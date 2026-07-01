import { useState } from "react";
// import { IceBreakerRevealButton } from "./icebreakerButton";
import { getIcebreaker } from "../services/icebreaker";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

// Co-located with the revealed list below; mirrors its shell — the same
// top margin and centered column the real `.icebreakerText` lines render in.
// function IcebreakerSkeleton() {
//   return (
//     <div
//       data-testid="icebreaker-skeleton"
//       className="mt-4 flex flex-col items-center gap-3"
//     >
//       <Skeleton className="h-4 w-full" />
//       <Skeleton className="h-4 w-5/6" />
//       <Skeleton className="h-4 w-2/3" />
//     </div>
//   );
// }

export default function Icebreaker({ "data-testid": dataTestId = "icebreaker-component" }) {
  const [icebreakers, setIcebreakers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (show) {
      setShow(false);
    } else {
      setLoading(true);
      setError(null);
      try {
        const icebreakerData = await getIcebreaker();
        setIcebreakers(icebreakerData.iceBreakers);
        setShow(true);
        // setError(null);
      } catch (err) {
        console.error("Could not fetch icebreaker:", err);
        setError("Could not fetch icebreaker");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div 
    className="max-w-[400px] mx-auto my-[10px] p-5 border border-slate-200 rounded-lg text-center"
    data-testid={dataTestId}
    >
      <IceBreakerRevealButton 
        show={show} 
        handleClick={handleClick}
        data-testid="icebreaker-reveal-btn"
      />

      {loading && <IcebreakerSkeleton />}

      {error && <p className="text-destructive mt-2">{error}</p>}

      {show && !loading && icebreakers.length > 0 && (

        <ul className="mt-4" data-testid="icebreaker-list">
          {icebreakers.map((item) => (
            <li key={item._id} className="text-base font-normal mb-[15px]">
              {item.icebreaker}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
