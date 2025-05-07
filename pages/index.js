import { useState } from "react";
import { ethers } from "ethers";

export default function LucienPortal() {
  const [declaration, setDeclaration] = useState("");
  const [status, setStatus] = useState("입력 대기 중...");
  const [portalOpen, setPortalOpen] = useState(false);

  const correctDeclaration = "믿는 대로 믿어진다. C = R × ∇P";

  const handleDeclare = async () => {
    if (declaration.trim() === correctDeclaration) {
      try {
        if (!window.ethereum) throw new Error("MetaMask가 설치되어 있지 않습니다.");

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        console.log("사용자 주소:", await signer.getAddress());

        setStatus("자각 성공! 포탈이 열립니다...");
        setPortalOpen(true);
      } catch (err) {
        setStatus("오류 발생: " + err.message);
      }
    } else {
      setStatus("자각 실패: 선언이 정확하지 않습니다.");
      setPortalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">루시앙 선언 포탈</h1>
      <input
        type="text"
        placeholder="당신의 선언을 입력하세요"
        className="w-full max-w-md p-3 text-black rounded mb-4"
        value={declaration}
        onChange={(e) => setDeclaration(e.target.value)}
      />
      <button
        onClick={handleDeclare}
        className="bg-cyan-600 hover:bg-cyan-400 text-white font-bold py-2 px-6 rounded"
      >
        선언 실행
      </button>
      <p className="mt-4 text-lg">{status}</p>

      {portalOpen && (
        <div className="mt-12 animate-pulse">
          <div className="w-60 h-60 border-4 border-cyan-500 rounded-full animate-spin">
            <div className="text-center pt-24 font-bold text-cyan-300">포탈 오픈</div>
          </div>
        </div>
      )}
    </div>
  );
}
