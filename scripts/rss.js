import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import { Feed } from 'feed'
import { dirname } from 'path'

const DOMAIN = 'https://chriswong.vercel.app'
const AUTHOR = {
  name: 'Chris Wong',
  email: 'wh18710455626@gmail.com',
  link: DOMAIN
}
const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
})

async function run() {
  await buildBlogRSS()
}

async function buildBlogRSS() {
  const files = await fg('pages/blogs/*.md')

  const options = {
    title: 'Chris Wong',
    description: 'Chris Wong\'s Blog',
    id: 'https://chriswong.vercel.app',
    link: 'https://chriswong.vercel.app',
    copyright: 'CC BY-NC-SA 4.0 2022 © Chris Wong',
    feedLinks: {
      json: 'https://chriswong.vercel.app/feed.json',
      atom: 'https://chriswong.vercel.app/feed.atom',
      rss: 'https://chriswong.vercel.app/feed.xml',
    }
  }
  const posts = (await Promise.all(
    files.filter(i => !i.includes('index'))
      .map(async (i) => {
        const raw = await fs.readFile(i, 'utf-8')
        const { data, content } = matter(raw)

        const html = markdown.render(content)
          .replace('src="/', `src="${DOMAIN}/`)
        if (data.image?.startsWith('/'))
          data.image = DOMAIN + data.image
        
        return {
          ...data,
          date: new Date(data.date),
          content: html,
          author: [AUTHOR],
          link: DOMAIN + i.replace(/^pages(.+)\.md$/, '$1')
        }
      })
  )).filter(Boolean)

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

  await writeFeed('feed', options, posts)
}

async function writeFeed(name, options, items) {
  options.author = AUTHOR
  options.image = ''
  options.favicon = ''

  const feed = new Feed(options)
  items.forEach(item => feed.addItem(item))

  await fs.ensureDir(dirname(`./dist/${name}`))
  await fs.writeFile(`./dist/${name}.xml`, feed.rss2(), 'utf-8')
  await fs.writeFile(`./dist/${name}.atom`, feed.atom1(), 'utf-8')
  await fs.writeFile(`./dist/${name}.json`, feed.json1(), 'utf-8')
}

run()
