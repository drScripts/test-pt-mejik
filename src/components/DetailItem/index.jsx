import React from "react";

export default function DetailItem({
  className,
  value,
  title,
  titleClass,
  valueClass,
  children,
}) {
  return (
    <div className={className}>
      <h1 className={`text-bold text-2xl mt-4 ${titleClass}`}>{title}</h1>

      {children ? (
        children
      ) : (
        <p className={`max-w-2xl text-justify mt-2 ${valueClass}`}>
          {value ??
            `
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus, earum? Iusto magni beatae veniam cumque corrupti nesciunt labore quos, itaque accusantium assumenda dicta modi odio recusandae commodi aliquid amet provident.
            Rem animi quisquam perspiciatis repellat sint temporibus iure consectetur ipsam modi aliquid delectus laudantium facilis ad libero, ea et dolorum minima. Dolores, explicabo iure fugit iusto accusantium corrupti quo impedit.`}
        </p>
      )}
    </div>
  );
}
