const Footer = () => {
  return (
    <div className=" mt-14 mx-auto w-4/5 px-4 py-2 font-normal text-[#455B73]">
      <hr className="h-px w-full border border-[#e5e7eb]"></hr>
      <footer className="flex flex-col md:flex-row items-center text-base mx-auto container justify-center md:justify-between py-2 my-4">
        <span className="md:inline block w-full text-center md:text-left">
          © {new Date().getFullYear()} WorkoutBuddy. All rights reserved.{" "}
        </span>
        <div className="inline-flex ml-0 md:ml-auto space-x-3 md:pt-0 pt-4">
          <a
            href="https://github.com/Oussemasahbeni"
            rel="noopener noreferrer"
            target="_blank"
            className="items-center gap-2"
          >
            <span className="hover:underline focus-visible:underline">
              {" "}
              <i className="pi pi-github"></i>Github
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/oussema-sahbeni/"
            rel="noopener noreferrer"
            target="_blank"
            className="items-center gap-2"
          >
            <span className="hover:underline focus-visible:underline">
              <i className="pi pi-linkedin"></i>
              Linkedin
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
