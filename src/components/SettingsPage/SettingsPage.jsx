import { useSelector } from "react-redux";

export default function SettingsPage() {
  const round = useSelector((store) => store.rounds);

  const ballsHit = round.reduce(
    (totalBalls, round) =>
      totalBalls + round.front_9_score + round.back_9_score,
    0
  );

  return (
    <div>
      <h1>Settings</h1>
      <div>
        Number of Balls Hit: <strong>{ballsHit}</strong>
      </div>
    </div>
  );
}
