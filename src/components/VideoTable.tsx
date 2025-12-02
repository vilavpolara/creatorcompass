export default function VideoTable({ videos, stats }: { videos: any[]; stats: any[] }) {
  const statsMap = Object.fromEntries(
    stats.map((v: any) => [v.id, v.statistics])
  );

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full text-left bg-white dark:bg-gray-800 shadow rounded-xl">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3">Thumbnail</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Published</th>
            <th className="px-4 py-3">Views</th>
            <th className="px-4 py-3">Likes</th>
          </tr>
        </thead>

        <tbody>
          {videos.map((item: any) => {
            const videoId = item.contentDetails.videoId;
            const metrics = statsMap[videoId];

            return (
              <tr
                key={videoId}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                onClick={() =>
                  window.open(`https://www.youtube.com/watch?v=${videoId}`)
                }
              >
                <td className="px-4 py-3">
                  <img
                    src={item.snippet.thumbnails.default.url}
                    className="rounded-md w-20"
                  />
                </td>

                <td className="px-4 py-3">{item.snippet.title}</td>

                <td className="px-4 py-3">
                  {new Date(item.snippet.publishedAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">{metrics?.viewCount ?? "–"}</td>

                <td className="px-4 py-3">{metrics?.likeCount ?? "–"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
