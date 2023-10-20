export default function Test({ params }: { params: { id: string } }) {
    return <h1>ID: {params.id}</h1>;
}