"use client";
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
  DrawerFooter,
  DrawerOverlay,
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
  const [isOpen, setIsOpen] = useState(false);

  const fetchIcebreakers = async () => {
      setLoading(true);
      setError(null);
      try {
        const icebreakerData = await getIcebreaker();
        setIcebreakers(icebreakerData.iceBreakers);
      } catch (err) {
        console.error("Could not fetch icebreaker:", err);
        setError("Could not fetch icebreaker");
      } finally {
        setLoading(false);
      }
  };
  return (
    <Drawer 
      open={isOpen}
      onOpenChange={(open) => {
      setIsOpen(open);
      if (open) fetchIcebreakers();
    }}>
      <DrawerTrigger asChild>
        <Button variant="outline" data-testid="icebreaker-reveal-btn">
          {isOpen ? "Hide the icebreakers 🧊 " : "Show me the icebreakers! 🧊 "}
        </Button>
      </DrawerTrigger>

      <DrawerContent data-testid="icebreaker-drawer">
        <DrawerOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="mx-auto w-full max-w-sm relative z-10">
          <DrawerHeader>
            <DrawerTitle>Icebreakers</DrawerTitle>
            <DrawerDescription>Need a conversation starter?</DrawerDescription>
          </DrawerHeader>

        <div className="p-4 flex flex-col items-center justify-center min-h-[200px]">
          {loading && (
            <div className="space-y-3" data-testid="icebreaker-skeleton">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          )}

            {error && (
              <p className="text-destructive text-center p-4" data-testid="icebreaker-error">
                {error}
              </p>
            )}

            {!loading && icebreakers.length > 0 && (

              <ul className="space-y-4" data-testid="icebreaker-list">
                {icebreakers.map((item) => (
                  <li key={item._id} className="text-base font-normal">
                    {item.icebreaker}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <DrawerFooter >
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>  
      </DrawerContent>
    </Drawer>
  );
}
