import { PrismaClient } from "@prisma/client"
import { PostItem } from "./PostItem"

/**
 * This page is rendered on at the server. That allows us to use Prisma
 * to fetch data from the database.
 * NOTE: You can't use a state management library like useState, Redux or MobX here.
 * @returns page that displays all posts
 */
export default async function UserPosts() {
  const prisma = new PrismaClient()

  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
  })

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}
