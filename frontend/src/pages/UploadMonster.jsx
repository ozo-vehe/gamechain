import { useState } from "react";
import { writeContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import { config } from "../config/wagmi";
import gamechain from "../contracts/Gamechain/Gamechain.json";
import { parseEther } from "ethers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMonsters } from "../features/gamechain/gamechainSlice";

const UploadMonster = () => {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    price: "",
    uri: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.symbol ||
      !formData.price ||
      !formData.uri
    ) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await writeContract(config, {
        abi: gamechain.abi,
        address: gamechain.contractAddress,
        functionName: "uploadMonsterCard",
        args: [
          formData.name,
          formData.symbol,
          formData.uri,
          parseEther(formData.price),
        ],
        account: address
      });

      setLoading(false);
      dispatch(fetchMonsters());

      alert("Monster uploaded successfully");
      
      navigate("/monsters");
    } catch (error) {
      console.log(error);
    }
    // Handle form submission logic here
  };

  return (
    <div className="min-h-[80vh] py-6 flex items-center justify-center sm:py-8">
      <div className="lg:w-[450px] md:w-[450px] mx-auto py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <h2 className="text-2xl font-bold mb-8 text-center michroma">
          Upload Monster
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 shadow w-full py-6 px-4 rounded-[12px]"
        >
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="peer w-full py-1 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-700 placeholder-transparent"
              placeholder="Monster Name"
            />
            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm">
              Monster Name
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              className="peer w-full py-1 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-700 placeholder-transparent"
              placeholder="Symbol"
            />
            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm">
              Symbol
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="peer w-full py-1 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-700 placeholder-transparent"
              placeholder="Price"
            />
            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm">
              Price
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="uri"
              value={formData.uri}
              onChange={handleChange}
              className="peer w-full py-1 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-700 placeholder-transparent"
              placeholder="URI"
            />
            <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm">
              URI
            </label>
          </div>

          <div className="relative">
            <button
              type="submit"
              className={`bg-cyan-700 text-white rounded-md px-6 h-[45px] py-2 ${loading ? '' : 'hover:bg-cyan-800'} focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50 w-full transition duration-200 flex items-center justify-center`}
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                "Upload Monster"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadMonster;
