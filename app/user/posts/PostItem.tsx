import { Post } from "@prisma/client"

export const PostItem = ({ post }: { post: Post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
