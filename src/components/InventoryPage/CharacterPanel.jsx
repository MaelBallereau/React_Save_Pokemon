export default function CharacterPanel() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-1/4 flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
        <img
          src="/images/character.png"
          alt="Personnage"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-lg font-semibold">Nom du personnage</p>
    </div>
  );
}
