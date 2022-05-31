import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";

export default function Rating({ total, value, size = 20 }) {
  return (
    <div className="flex space-x-2">
      {[...new Array(total)].map((val, i) =>
        i < value ? (
          <StarIcon width={size} height={size} color={"#f2b85e"} key={i} />
        ) : (
          <StarIconOutline width={size} height={size} key={i} />
        )
      )}
    </div>
  );
}
