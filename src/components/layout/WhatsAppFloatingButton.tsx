import React from 'react';

const WhatsAppFloatingButton = () => {
  return (
    <a
      href="https://wa.me/918143735454"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 group hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
      aria-label="Chat with our WhatsApp Bot"
    >
      {/* Pulse Rings */}
      <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping opacity-75" />
      
      {/* WhatsApp SVG Icon */}
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8 text-white fill-current relative z-10"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.99 11.45.989c-5.438 0-9.861 4.37-9.866 9.8-.001 1.716.463 3.39 1.34 4.877L1.87 21.085l5.962-1.564l-.06-.039m10.15-7.054c-.27-.135-1.602-.79-1.85-.88-.25-.09-.432-.135-.612.135-.18.27-.697.88-.855 1.061-.157.18-.315.2-.585.065-.27-.136-1.14-.42-2.172-1.34c-.803-.715-1.345-1.6-1.502-1.87-.158-.27-.017-.417.118-.552.122-.122.27-.315.405-.471.135-.158.18-.27.27-.45.09-.18.044-.337-.02-.472-.064-.135-.612-1.474-.838-2.014-.22-.53-.46-.457-.633-.466-.164-.008-.353-.01-.542-.01-.19 0-.498.07-.759.36-.26.29-1.002.978-1.002 2.384s1.025 2.766 1.168 2.96c.143.194 2.017 3.08 4.887 4.321.682.296 1.215.472 1.63.602.686.218 1.312.187 1.807.113.552-.083 1.602-.654 1.828-1.253.226-.6.226-1.114.158-1.222-.068-.108-.25-.173-.52-.308z" />
      </svg>
      
      {/* Tooltip */}
      <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-zinc-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap z-50">
        Chat with our WhatsApp Bot
      </span>
    </a>
  );
};

export default WhatsAppFloatingButton;
