import React from 'react';

interface TrackedCrypto {
  symbol: string;
  onRemove: (symbol: string) => void;
}

const RemoveTrackedCrypto = ({ symbol, onRemove }: TrackedCrypto) => {
  const handleRemoveCrypto = async (symbol: string) => {
    const response = await fetch('/api/user/tracked-cryptos/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol }),
    });

    if (response.ok) {
      console.log('Successfully removed tracked crypto');
      onRemove(symbol);
    } else {
      console.error('Failed to remove tracked crypto');
    }
  }

  return (
    <div>
      <button
        onClick={() => handleRemoveCrypto(symbol)}
        className="text-red-600 font-bold text-xs bg-red-300 rounded-sm px-[.5rem] py-[.075rem] float-right hover:bg-red-500 hover:text-red-100"
      >
        Remove
      </button>
    </div>
  );
}

export default RemoveTrackedCrypto;