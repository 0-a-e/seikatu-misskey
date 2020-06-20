import React, { useState, useEffect } from 'react'
import htmlToImage from 'html-to-image'
import download from 'downloadjs'
import GoogleAds from 'react-google-ads'

import { Calendar } from './Calendar'
import { Period } from './api/client'
import { ButtonSaveImage } from './ButtonSaveImage'
import { ButtonShareTwitter } from './ButtonShareTwitter'

import { getPeriods } from './api/client'

const handleSave = async (dom: HTMLDivElement | null) => {
  console.log(dom)
  if (!dom) {
    return
  }
  const dataUrl = await htmlToImage.toJpeg(dom, { quality: 0.95 })
  download(dataUrl, 'calendar.jpeg', 'image/jpeg')
}

const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec))

const Tips = () => {
  return (
    <p>
      <span role="img" aria-label="Tips">
        💡
      </span>
      クリックすることで起床後・就寝前のツイートを見ることができます。
    </p>
  )
}

export const CalendarContainer = () => {
  const [periods, setPeriods] = useState(new Array<Period>())

  const [infoMsg, setInfoMsg] = useState('Now Loading...')

  const [generatingImage, setGeneratingImage] = useState(false)

  const ref = React.createRef<HTMLDivElement>()

  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    const handleSaveAsync = async () => {
      await sleep(1000)
      await handleSave(ref.current)
      setGeneratingImage(false)
    }
    handleSaveAsync()
  }, [ref])

  useEffect(() => {
    const getPeriodsAsync = async () => {
      try {
        const res = await getPeriods()
        console.log(res)
        if (res.periods.length === 0) {
          setInfoMsg('直近のツイートが存在しません')
          return
        }
        setPeriods(res.periods)
        setShareUrl(res.shareUrl)
      } catch (e) {
        setInfoMsg('ツイートの取得に失敗しました。時間を空けてもう一度お試しください。')
        return
      }
    }
    getPeriodsAsync()
  }, [])

  return (
    <>
      {periods.length !== 0 ? (
        <>
          <Tips />
          <Calendar periods={periods} generatingImage={false}></Calendar>
          <ButtonShareTwitter
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&hashtags=生活習慣の乱れを可視化するやつ`}
          />
          <ButtonSaveImage
            onClick={async () => {
              setGeneratingImage(true)
            }}
          ></ButtonSaveImage>
          <GoogleAds
            client="ca-pub-4978327687969784"
            slot="6211274963"
            className="adsbygoogle"
            format="auto"
            style={{ display: 'block' }}
          />
          {generatingImage ? (
            <>
              <p>画像生成中...</p>
              <Calendar periods={periods} generatingImage={generatingImage} ref={ref}></Calendar>
            </>
          ) : null}
        </>
      ) : (
        <p>{infoMsg}</p>
      )}
    </>
  )
}
