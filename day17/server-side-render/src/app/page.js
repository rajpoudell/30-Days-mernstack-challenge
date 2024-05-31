import Link from "next/link";

// `app/page.js` is the UI for the `/` URL
export default function Page() {
  return (
    <>
    
     <div className="container mx-auto px-4 text-white">
        <h1>Hello word</h1>
        <p>This is a content to make our page longer</p>
        <div className="w-full h-screen bg-gray-900">
          <div className="col1"> </div>
          <div className="col1"></div>
        </div>
        <p>
          Lorem Ipsum is simply dummy text ...
        </p>
      </div>
    </>
  );
}
