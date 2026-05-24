import React from 'react';

const Elite = () => {
  return (
    <div className="min-h-screen bg-[#161716]">
      <iframe
        src="https://autonomous-business-2.preview.emergentagent.com/"
        title="Arxeon Elite Landing Page"
        className="w-full border-none"
        style={{ width: '100%', height: 'calc(100vh - 80px)', marginTop: '80px' }}
        data-testid="elite-iframe"
      />
    </div>
  );
};

export default Elite;
