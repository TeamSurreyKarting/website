interface User {
    name: string;
    points: number;
}

const users: User[] = [
    { name: "First LastName", points: 1242 },
    { name: "Second LastName", points: 1106 },
    { name: "Third LastName", points: 954 },
];

export default function LeaderboardStats() {

    const sortedUsers = users.sort((a, b) => b.points - a.points);

    return (
        <div className="bg-nile-blue-950/30 p-5 w-full md:w-[70%] mx-auto rounded-lg">
            <h2 className="text-2xl font-extrabold text-nile-blue-100 text-center mb-5">Global Leaderboard</h2>
            {sortedUsers.map((user, index) => (
                <div
                    key={index}
                    className="flex items-center bg-nile-blue-200 p-3 rounded-md shadow-sm mb-2"
                >
                    <p className="font-bold">#{index + 1}</p>
                    <div className="ml-4 flex-grow">
                        <h5 className="text-lg font-semibold">{user.name}</h5>
                        <p className="text-gray-600">Points: {user.points}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
