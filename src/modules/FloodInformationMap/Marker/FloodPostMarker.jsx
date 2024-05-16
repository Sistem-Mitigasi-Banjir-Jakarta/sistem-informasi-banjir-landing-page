import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { PersonIcon, PhoneIcon } from "@/components/icons";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { initialFloodPost } from "@/data/FloodInformationMap";
import { cleanPhoneNumber } from "@/utils";

const markerFloodPost = L.divIcon({
  html: `<svg width="25" height="37" viewBox="0 0 34 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_2008_1126)">
<circle cx="17.5" cy="15.5" r="9.5" fill="#FF5056" />
<path d="M17 0.5C12.6239 0.5 8.42709 2.23839 5.33274 5.33274C2.23839 8.42709 0.5 12.6239 0.5 17C0.5 25.715 15.2 44.15 15.83 44.945C15.9706 45.1202 16.1487 45.2616 16.3512 45.3587C16.5537 45.4559 16.7754 45.5063 17 45.5063C17.2246 45.5063 17.4463 45.4559 17.6488 45.3587C17.8513 45.2616 18.0294 45.1202 18.17 44.945C18.8 44.15 33.5 25.715 33.5 17C33.5 12.6239 31.7616 8.42709 28.6673 5.33274C25.5729 2.23839 21.3761 0.5 17 0.5ZM17 24.5C15.22 24.5 13.4799 23.9722 11.9999 22.9832C10.5198 21.9943 9.36627 20.5887 8.68509 18.9442C8.0039 17.2996 7.82567 15.49 8.17293 13.7442C8.5202 11.9984 9.37737 10.3947 10.636 9.13604C11.8947 7.87737 13.4984 7.0202 15.2442 6.67293C16.99 6.32567 18.7996 6.5039 20.4442 7.18508C22.0887 7.86627 23.4943 9.01983 24.4832 10.4999C25.4722 11.9799 26 13.72 26 15.5C26 17.8869 25.0518 20.1761 23.364 21.864C21.6761 23.5518 19.3869 24.5 17 24.5Z" fill="#FF5056" />
<path d="M17 0.5V6.5V11C17 11 17 12.6131 17 15C17 17.3869 17.0002 18.5 17.0002 21C16.9998 23 17 23 17 24.5V45.5C17.2253 45.499 17.4475 45.4472 17.65 45.3485C17.8526 45.2498 18.0303 45.1068 18.17 44.93C18.8 44.15 33.5 25.715 33.5 17C33.5 12.6239 31.7616 8.42709 28.6673 5.33274C25.5729 2.23839 21.3761 0.5 17 0.5Z" fill="#DC2F35" />
<path d="M27.4732 26.6818H7.02681C6.91227 26.6818 6.82227 26.5918 6.82227 26.4773C6.82227 26.3627 6.91227 26.2727 7.02681 26.2727H27.4773C27.5918 26.2727 27.6818 26.3627 27.6818 26.4773C27.6818 26.5918 27.5877 26.6818 27.4732 26.6818Z" fill="#DC2F35" />
<path d="M24.9209 26.6818H9.57999C9.51863 26.6818 9.46136 26.6531 9.42045 26.6081C9.37954 26.559 9.36727 26.4977 9.37954 26.4363C10.21 22.4845 10.1773 19.4572 9.8009 14.5604C9.79681 14.4827 9.83363 14.409 9.89909 14.3722L17.14 9.89677C17.2054 9.85586 17.2873 9.85586 17.3568 9.89677L24.5977 14.3722C24.6673 14.4131 24.7041 14.495 24.6918 14.5727C24.07 19.3345 23.9759 22.3209 25.1132 26.424C25.1295 26.4854 25.1173 26.5509 25.0805 26.604C25.0436 26.6531 24.9823 26.6818 24.9209 26.6818Z" fill="white" />
<path d="M20.8709 8.78415H17.2504C17.1359 8.78415 17.0459 8.69415 17.0459 8.5796V6.02278C17.0459 5.90824 17.1359 5.81824 17.2504 5.81824H18.4164C19.8809 5.81824 21.0754 7.01278 21.0754 8.47733V8.5796C21.0754 8.69415 20.9854 8.78415 20.8709 8.78415Z" fill="white" />
<path d="M7.45238 26.6819C7.44829 26.6819 7.44829 26.6819 7.4442 26.6819C7.34601 26.6778 7.2642 26.6001 7.25192 26.5019L6.82647 23.0941C6.8142 22.9837 6.89192 22.8814 7.00238 22.8651C7.11283 22.8528 7.21511 22.9305 7.23147 23.041L7.50965 25.2501L9.81283 14.4991C9.83738 14.3887 9.94374 14.3191 10.0542 14.3437C10.1647 14.3682 10.2342 14.4746 10.2097 14.5851L7.65283 26.5182C7.63238 26.6164 7.54647 26.6819 7.45238 26.6819ZM27.0478 26.6819C26.9537 26.6819 26.8678 26.6164 26.8474 26.5182L24.2906 14.5851C24.266 14.4746 24.3356 14.3641 24.446 14.3437C24.5565 14.3191 24.6669 14.3887 24.6874 14.4991L26.9906 25.2501L27.2687 23.041C27.281 22.9305 27.3833 22.8487 27.4978 22.8651C27.6083 22.8773 27.6901 22.9796 27.6737 23.0941L27.2483 26.5019C27.236 26.6001 27.1542 26.6778 27.056 26.6819C27.056 26.6819 27.0519 26.6819 27.0478 26.6819ZM20.4451 26.6819H14.0551C13.9978 26.6819 13.9447 26.6573 13.9078 26.6164C13.871 26.5755 13.8506 26.5223 13.8506 26.4651L14.1369 20.8482C14.141 20.7378 14.231 20.656 14.3415 20.656C15.7447 20.656 16.8983 19.5596 16.9719 18.1564C16.976 18.0501 17.066 17.9641 17.1724 17.9641C17.2787 17.9641 17.3687 18.046 17.3769 18.1523C17.4833 19.5146 18.6369 20.5864 20.0033 20.5864C20.1096 20.5864 20.1996 20.6682 20.2078 20.7746L20.6456 26.461C20.6497 26.5182 20.6292 26.5755 20.5924 26.6164C20.5556 26.6573 20.5024 26.6819 20.4451 26.6819ZM14.2719 26.2728H20.2242L19.8192 20.9873C19.1197 20.9423 18.461 20.6641 17.9415 20.1814C17.6101 19.8746 17.3565 19.5064 17.1928 19.0973C16.7797 20.1937 15.7528 20.9791 14.5419 21.0569L14.2719 26.2728ZM17.6756 16.4546H16.8247C16.7101 16.4546 16.6201 16.3646 16.6201 16.2501V15.391H15.761C15.6465 15.391 15.5565 15.301 15.5565 15.1864V14.3355C15.5565 14.221 15.6465 14.131 15.761 14.131H16.6201V13.2719C16.6201 13.1573 16.7101 13.0673 16.8247 13.0673H17.6756C17.7901 13.0673 17.8801 13.1573 17.8801 13.2719V14.131H18.7392C18.8537 14.131 18.9437 14.221 18.9437 14.3355V15.1864C18.9437 15.301 18.8537 15.391 18.7392 15.391H17.8801V16.2501C17.8801 16.3646 17.7901 16.4546 17.6756 16.4546ZM17.0292 16.0455H17.471V15.1864C17.471 15.0719 17.561 14.9819 17.6756 14.9819H18.5347V14.5401H17.6756C17.561 14.5401 17.471 14.4501 17.471 14.3355V13.4764H17.0292V14.3355C17.0292 14.4501 16.9392 14.5401 16.8247 14.5401H15.9656V14.9819H16.8247C16.9392 14.9819 17.0292 15.0719 17.0292 15.1864V16.0455ZM17.2501 10.2773C17.1356 10.2773 17.0456 10.1873 17.0456 10.0728V6.02278C17.0456 5.90824 17.1356 5.81824 17.2501 5.81824C17.3647 5.81824 17.4547 5.90824 17.4547 6.02278V10.0728C17.4547 10.1832 17.3647 10.2773 17.2501 10.2773Z" fill="#FE2128" />
<path d="M19.301 8.25H18.7986C18.731 8.25 18.6778 8.19686 18.6778 8.12923V7.62198H18.1706C18.1029 7.62198 18.0498 7.56884 18.0498 7.50121V6.99879C18.0498 6.93116 18.1029 6.87802 18.1706 6.87802H18.6778V6.37077C18.6778 6.30314 18.731 6.25 18.7986 6.25H19.301C19.3686 6.25 19.4218 6.30314 19.4218 6.37077V6.87802H19.929C19.9967 6.87802 20.0498 6.93116 20.0498 6.99879V7.50121C20.0498 7.56884 19.9967 7.62198 19.929 7.62198H19.4218V8.12923C19.4218 8.19686 19.3686 8.25 19.301 8.25ZM18.9194 8.00845H19.1802V7.50121C19.1802 7.43358 19.2334 7.38044 19.301 7.38044H19.8083V7.11957H19.301C19.2334 7.11957 19.1802 7.06643 19.1802 6.99879V6.49155H18.9194V6.99879C18.9194 7.06643 18.8662 7.11957 18.7986 7.11957H18.2914V7.38044H18.7986C18.8662 7.38044 18.9194 7.43358 18.9194 7.50121V8.00845Z" fill="#DC2F35" />
</g>
<defs>
<clipPath id="clip0_2008_1126">
<rect width="25" height="37" fill="white" />
</clipPath>
</defs>
</svg>`,
  iconSize: [25, 32],
  className: "marker-icon",
});

export const FloodPostMarker = ({ activeFloodPostMarker }) => {
  return (
    <>
      {initialFloodPost.map((floodPost) =>
        activeFloodPostMarker ? (
          <Marker
            key={floodPost.properties.id}
            position={[
              Number(floodPost.geometry.coordinates[1]),
              Number(floodPost.geometry.coordinates[0]),
            ]}
            icon={markerFloodPost}
          >
            <Popup className="m-0">
              <Card>
                <CardHeader className="rounded-t-lg bg-[#FF5056] p-0">
                  <h3 className="p-2 text-center text-sm font-semibold text-white">
                    Posko Banjir {""}
                    {floodPost.properties.lokasi ?? "-"}
                  </h3>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <PersonIcon className="h-5 w-5 text-gray-500" />
                      <h5 className="ml-2 text-sm font-semibold text-gray-500">
                        {floodPost.properties.pic_name ?? "-"}
                      </h5>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-gray-500" />
                      <h5 className="ml-2 text-sm font-semibold text-gray-500">
                        {cleanPhoneNumber(floodPost.properties.pic_phone) ??
                          "-"}
                      </h5>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Popup>
          </Marker>
        ) : null,
      )}
    </>
  );
};
