import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import { genPageMetadata } from 'app/seo'
import { createTranslation } from '@/i18n/server'
import { allTags } from '@/data/index'

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const { lang } = params
  const { t } = await createTranslation(lang)
  return await genPageMetadata({ lang, title: t('tags'), description: t('things-i-blog-about') })
}

export default async function Page({ params }: { params: { lang: string } }) {
  const { lang } = params
  const tagCounts = allTags(lang)
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const { t } = await createTranslation(lang)

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            {t('tags')}
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && t('no-tags-found')}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mb-2 mr-5 mt-2">
                <Tag lang={lang} text={t} />
                <Link
                  href={`/${lang}/tags/${slug(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${t}`}
                >
                  {` (${tagCounts[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
