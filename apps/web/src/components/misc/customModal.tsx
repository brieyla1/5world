import Image from "next/image";
import CloseIcon from "public/icons/customModal/closeIcon.svg";

type ModalProps = {
  show: boolean;
  close: any;
  children: any;
  heading?: string;
  modalMarginTop?: string;
  padding?: string;
  removeCloseIcon?: boolean;
};

const CustomModal = ({
  show,
  close,
  children,
  heading,
  modalMarginTop,
  padding,
  removeCloseIcon,
}: ModalProps) => {
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } fixed top-0 left-0 z-50 mx-auto h-full w-full overflow-auto backdrop-brightness-50`}
      //   onClick={() => setClickedOutside(true)}
    >
      <div
        className={`${modalMarginTop ? modalMarginTop : "my-[100px]"} ${
          padding ? padding : "p-6 md:p-[30px] md:pl-[50px]"
        } mx-auto h-auto max-w-[370px]  overflow-auto rounded-[20px] bg-white  md:max-w-[1140px] `}
        // onClick={() => setClickedOutside(false)}
      >
        <div className="flex justify-between">
          <div>
            {heading && (
              <div className="pt-5 font-heading text-[26px] font-medium text-vdao-dark md:text-3xl">
                {heading}
              </div>
            )}
          </div>

          {!removeCloseIcon && (
            <Image
              src={CloseIcon}
              alt="close"
              className="float-right cursor-pointer"
              onClick={() => {
                close();
              }}
            />
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

export default CustomModal;