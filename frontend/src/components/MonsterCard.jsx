import PropTypes from "prop-types";

const MonsterCard = ({ monster, onSelect }) => {
  const handleClick = () => {
    onSelect(monster);
  };

  return (
    <div onClick={handleClick} className="roadmap-card w-[350px] h-[450px] border border-cyan-700 flex flex-col items-end justify-start gap-4 p-6 cursor-pointer relative">
      <div className="w-full h-[85%] flex items-center justify-center">
        <img
          className="w-full h-full object-cover object-top"
          src={monster.image}
          alt="Image"
        />
      </div>
      <p className="text-center text-cyan-800 text-[20px] font-[700] michroma w-full">
        { monster.name }
      </p>
    </div>
  );
};

export default MonsterCard;

MonsterCard.propTypes = {
  monster: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};
