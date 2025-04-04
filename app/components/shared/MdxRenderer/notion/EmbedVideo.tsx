const Embed = ({ url }: { url: string }) => {
  return (
    <div className="w-full aspect-video my-6">
      <iframe
        src={url}
        title="Embedded Content"
        className="w-full h-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Embed;
