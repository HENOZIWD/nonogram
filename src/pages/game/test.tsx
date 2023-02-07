import Link from "next/link";

export default function Test() {

  return (
    <div style={{ minHeight: '100vh' }}>
      <Link
        href={'/'}
      >
        Back to Home
      </Link>
    </div>
  )
}