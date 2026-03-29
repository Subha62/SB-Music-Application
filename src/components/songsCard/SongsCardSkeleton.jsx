// import React from "react";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// const SongsCardSkeleton = ({ amount }) => {
//   const arrayCount = Array(amount).fill(1);

//   return arrayCount.map((val, index) => (
//     <div className="songs-card-container cur-pointer" key={index}>
//       <div className="songs-card-wrapper">
//         <SkeletonTheme baseColor="#202020" highlightColor="#292828">
//           <div className="songs-image-wrapper">
//             <Skeleton height={"100%"} />
//           </div>
//           <div className="songs-title-channel-wrapper">
//             <p className="songs-title">
//               <Skeleton height={"8px"} count={1} />
//             </p>
//             <p className="songs-channel">
//               <Skeleton height={"8px"} width={"80px"} count={1} />
//             </p>
//           </div>
//         </SkeletonTheme>
//       </div>
//     </div>
//   ));
// };

// export default SongsCardSkeleton;



import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SongsCardSkeleton = ({ amount = 6 }) => {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <div className="songs-card-container" key={index}>
          <div className="songs-card-wrapper">
            <SkeletonTheme
              baseColor="#1a1a1a"
              highlightColor="#2a2a2a"
              duration={1.8}
            >
              <div className="songs-image-wrapper">
                <Skeleton height="100%" borderRadius={12} />
              </div>

              <div className="songs-title-channel-wrapper">
                <p className="songs-title">
                  <Skeleton height={10} width="90%" />
                </p>

                <p className="songs-channel">
                  <Skeleton height={8} width={80} />
                </p>
              </div>
            </SkeletonTheme>
          </div>
        </div>
      ))}
    </>
  );
};

export default React.memo(SongsCardSkeleton);
