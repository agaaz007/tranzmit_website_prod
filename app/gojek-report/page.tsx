"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Play, Pause, X, ExternalLink, MessageCircle, Clock, Sparkles, ChevronRight } from "lucide-react"

// Types for respondent data
interface Message {
  role: "agent" | "user"
  content: string
}

interface Respondent {
  id: string
  name: string
  tagline: string
  demographics: {
    occupation?: string
    sport?: string
    experience?: string
    apps?: string[]
  }
  conversation: Message[]
  audioUrl: string
  keyInsights?: string[]
  accentColor: string
}

// All 7 respondents from CSV (with proper labeling for duplicates)
const respondents: Respondent[] = [
  {
    id: "01",
    name: "Faris",
    tagline: "Veteran softball player using Reclub & Kuy to find communities",
    demographics: {
      occupation: "Karyawan Swasta",
      sport: "Softball",
      experience: "5 tahun",
      apps: ["Reclub", "Kuy", "WhatsApp", "Instagram", "YouTube"],
    },
    accentColor: "from-orange-500 to-amber-600",
    conversation: [
      { role: "agent", content: "Halo! Selamat pagi. Terima kasih sudah meluangkan waktu untuk bergabung dengan saya hari ini. Nama saya Putri, dan saya akan memandu diskusi kita tentang kebiasaan olahraga kamu. Santai aja ya, nggak ada jawaban benar atau salah. Boleh tahu nama kamu dan apa kesibukan sehari-hari kamu?" },
      { role: "user", content: "Halo nama saya Farid." },
      { role: "agent", content: "Senang berkenalan dengan kamu, Farid! Jadi kamu kerja pagi setiap hari, ya? Apa jenis pekerjaan kamu kalau boleh tahu?" },
      { role: "user", content: "Karyawan swasta." },
      { role: "agent", content: "Nah, sekarang saya pengin tahu tentang hobi olahraga kamu. Udah berapa lama kamu menjalani hobi olahraga ini?" },
      { role: "user", content: "Saya main softball udah lima tahun." },
      { role: "agent", content: "Menarik! Gimana cara kamu bisa nyeimpin waktu buat main sofbol di jadwal kerja pagi kamu yang padat?" },
      { role: "user", content: "Orangnya sih tiap jam delapan sampai jam sepuluh malam jadi masih bisa pulang kerja." },
      { role: "agent", content: "Apa momen atau pemicu yang bikin kamu mulai main sofbol pertama kali?" },
      { role: "user", content: "Saya udah main dari kecil tapi baru bisa main lagi pas umur segini karena ada teman-teman yang main." },
      { role: "agent", content: "Waktu teman-teman kamu ajak main sofbol lagi, apa satu hal pertama banget yang kamu lakukan saat itu?" },
      { role: "user", content: "Alat-alat kayak glove, terus beli batnya juga, beli batting glove, terus ngajak temen-temen yang lama main." },
      { role: "agent", content: "Waktu fase awal itu, apakah kamu pakai aplikasi atau website tertentu buat cari informasi tentang sofbol atau cari tempat main?" },
      { role: "user", content: "Iya saya pakai namanya Reclub dan juga Kuy." },
      { role: "agent", content: "Buat apa sih kamu pakai aplikasi-aplikasi itu?" },
      { role: "user", content: "Cari komunitas yang lagi ada latihan, jadi bisa join karena kalau main sendiri nggak bisa." },
      { role: "agent", content: "Di minggu-minggu awal waktu kamu mulai join komunitas itu, apa tantangan atau kesulitan terbesar yang kamu hadapi?" },
      { role: "user", content: "Jadwalnya sih yang cari yang cocok." },
      { role: "agent", content: "Apakah akhirnya kamu ketemu jadwal yang pas atau masih sering ada konflik?" },
      { role: "user", content: "Masih usahain jadi jadwal yang kosong jadi mesti ngecek ke Reclub atau Kuy bolak balik mana yang lagi ada latihan." },
      { role: "agent", content: "Dari semua proses tadi, apa sih yang paling ribet atau yang paling pengen kamu ubah jadi lebih gampang?" },
      { role: "user", content: "Join. Jadi kalau misalnya mau rekrut tuh pembayaran paling ribet karena setiap join harus bayar di aplikasi lain lagi." },
      { role: "agent", content: "Jadi kamu pengen semuanya bisa dalam satu aplikasi aja gitu?" },
      { role: "user", content: "Betul, bisa bayar booking di aplikasi yang sama." },
      { role: "agent", content: "Apa yang bikin kamu tetap berangkat latihan di hari-hari malas?" },
      { role: "user", content: "Kan emang udah rutinitas dan pengen ketemu temen-temen sih." },
      { role: "agent", content: "Motivasi kamu sekarang beda nggak sama waktu awal mulai main sofbol dulu?" },
      { role: "user", content: "Sekarang sih lebih ke meningkatin skill dan persiapan ikut turnamen-turnamen besar." },
      { role: "agent", content: "Biasanya kamu cari tips atau cara latihan dari mana?" },
      { role: "user", content: "Penting banget sih untuk improving biasanya lihat di YouTube sama ikut coaching." },
      { role: "agent", content: "Menurutmu, apa sih arti 'komunitas' di olahraga sofbol ini?" },
      { role: "user", content: "Tempat untuk punya teman-teman baru untuk mengasah skill, sharing knowledge." },
      { role: "agent", content: "Komunitas sofbol ini 'hidup'-nya di mana sih? Lebih ramai pas ketemu langsung di lapangan atau di grup WhatsApp?" },
      { role: "user", content: "Rame dua-duanya sih di grup WhatsApp juga rame, di lapangan juga seru." },
      { role: "agent", content: "Kamu tipe yang share hasil olahraga ke media sosial nggak?" },
      { role: "user", content: "Iya di-share ke Instagram video main terus hasil lemparan dan lain-lain." },
      { role: "agent", content: "Kenapa kamu share itu?" },
      { role: "user", content: "Karena temen-temen pengen nunjukin ke temen-temen kalau misalnya aku udah mulai jago terus juga bisa share tips atau knowledge ke temen-temen." },
      { role: "agent", content: "Aplikasi apa aja yang wajib ada di HP kamu buat dukung hobi sofbol ini?" },
      { role: "user", content: "Yang paling penting WhatsApp, Instagram, Kuy, Reclub, YouTube, terus buat belanja." },
      { role: "agent", content: "Dari semua aplikasi itu, mana yang paling favorit untuk olahraga?" },
      { role: "user", content: "Kuy." },
      { role: "agent", content: "Kamu tau aplikasi Kuy itu awalnya dari mana?" },
      { role: "user", content: "Dari komunitasnya yang share kalau misalnya untuk daftar via Kuy." },
      { role: "agent", content: "Apa satu hal yang bikin kamu akhirnya install aplikasi Kuy itu?" },
      { role: "user", content: "Kalau mau join latihan harus booking di Kuy." },
      { role: "agent", content: "Apa kelebihan utama aplikasi Kuy ini dibanding aplikasi lain?" },
      { role: "user", content: "Fiturnya kan jadwalnya banyak, orang-orang juga pada pakai dan untuk ngelihat siapa aja yang join lebih mudah." },
      { role: "agent", content: "Tampilan atau fitur apa yang paling kamu suka di aplikasi Kuy?" },
      { role: "user", content: "Untuk cek history latihan, terus fitur untuk open di latihan." },
      { role: "agent", content: "Apa 'dosa terbesar' atau hal paling nyebelin dari aplikasi Kuy ini?" },
      { role: "user", content: "Kayaknya semua udah ada, jadi udah oke kok." },
      { role: "agent", content: "Kalau besok kamu jadi CEO aplikasi Kuy, satu hal apa yang mau kamu perbaiki atau tambahkan?" },
      { role: "user", content: "Mungkin social media. Bisa share progress, update, terus foto-foto, jadi orang-orang bisa ngelihat accountku langsung tahu apa aja yang aku lakuin." },
    ],
    audioUrl: "https://drive.google.com/file/d/1P-uwklSdPxT1oKdyk1z-fYoLSiiyujsW/view?usp=drive_link",
    keyInsights: [
      "Payment flow is fragmented - wants integrated booking & payment",
      "Motivation evolved from fun to skill improvement & tournaments",
      "Community is key for both online (WhatsApp) and offline engagement",
      "Wants social features in Kuy to share progress & content",
    ],
  },
  {
    id: "02",
    name: "Anggun-01",
    tagline: "Multi-sport enthusiast - short session recording",
    demographics: {
      occupation: "Office Worker",
      sport: "Pilates, Yoga, Gym, Running, Squash",
      experience: "Several years",
      apps: ["Reclub", "Kuy", "WhatsApp", "Instagram"],
    },
    accentColor: "from-violet-500 to-purple-600",
    conversation: [
      { role: "agent", content: "Halo! Selamat pagi. Terima kasih sudah meluangkan waktu untuk bergabung dengan saya hari ini. Nama saya Putri, dan saya akan memandu diskusi kita tentang kebiasaan olahraga kamu. Santai aja ya, nggak ada jawaban benar atau salah di sini. Boleh tahu nama kamu siapa dan apa kesibukan kamu sehari-hari?" },
      { role: "user", content: "Nama aku Anggun. Kesibukan kerja, hari-harinya kerja terus ngurus, eh, ya kerja aja sih sama olahraga di pagi, hari, dan weekend." },
      { role: "agent", content: "Ah oke, Anggun. Jadi kamu tipe yang bisa nyisipin olahraga di pagi hari dan juga weekend, meskipun kerja padat. Itu bagus banget. Udah berapa lama kamu menjalani hobi olahraga ini? Dan spesifiknya olahraga apa yang kamu lakuin?" },
      { role: "user", content: "Udah beberapa tahun belakangan olahraganya kalau pagi biasanya pilates atau yoga atau sempetin ke gym. Tapi kalau weekend bisa gym, bisa lari, bisa squash juga." },
      { role: "agent", content: "Ah menarik, jadi kamu tipe yang variatif banget ya—pagi ada pilates, yoga, atau gym, terus weekend bisa lari atau squash juga. Itu berarti olahraga itu udah jadi bagian penting dari rutinitas kamu. Gimana cara kamu bisa nyisipin semua itu di jadwal yang padat? Apakah jadwalnya ketat banget sampai ada hal lain yang terpaksa kamu korbankan biar tetap bisa olahraga?" },
      { role: "user", content: "Udah beberapa tahun belakangan olahraganya kalau pagi biasanya pilates atau yoga atau sempetin ke gym. Tapi kalau weekend bisa gym, bisa lari, bisa squash juga." },
    ],
    audioUrl: "https://drive.google.com/file/d/1-DuYoh-P9-udVxKzzXUVMmGIJvX-cJ4-/view?usp=sharing",
    keyInsights: [
      "Multi-sport participant with varied routine",
      "Morning and weekend exercise schedule",
      "Short recording session - incomplete data",
    ],
  },
  {
    id: "03",
    name: "Anggun-02",
    tagline: "Squash player since 2017, uses Reclub for communities - full session",
    demographics: {
      occupation: "Office Worker",
      sport: "Squash, Pilates, Yoga, Gym, Running",
      experience: "Since 2017 (squash)",
      apps: ["Reclub", "Kuy", "WhatsApp", "Instagram"],
    },
    accentColor: "from-fuchsia-500 to-pink-600",
    conversation: [
      { role: "agent", content: "Halo! Selamat pagi. Terima kasih sudah meluangkan waktu untuk bergabung dengan saya hari ini. Nama saya Putri, dan saya akan memandu diskusi kita. Santai aja ya, nggak ada jawaban benar atau salah—ini cuma obrolan biasa. Boleh tahu nama kamu dan apa kesibukan sehari-hari kamu? Apa pekerjaan kamu?" },
      { role: "user", content: "Eh, namaku Anggun. Aku sehari-harinya, eh, kerja aja. Terus kalau misalnya lagi pengen olahraga, pagi-paginya olahraga atau biasanya weekend daripada bosen di rumah jadi olahraga juga pas weekend." },
      { role: "agent", content: "Ah menarik, Anggun! Jadi kamu kerja dan olahraga jadi cara kamu ngisi waktu luang, terutama di weekend. Oke, sebelum kita masuk lebih dalam, coba ceritain ke saya—udah berapa lama sih kamu menjalani hobi olahraga ini? Dan spesifiknya olahraga apa yang kamu suka?" },
      { role: "user", content: "Sebenarnya dari dulu suka dari sekolah udah suka olahraga. Tapi kalau kerja kan pasti nggak selalu ada waktu. Jadi sempat stop tapi belakangan lagi mulai lagi, pagi-pagi sebelum ke kantor coba buat gym atau pilates yang ada di dekat kantor. Terus kalau weekend bisa lari, bisa gym juga lagi atau main squash." },
      { role: "agent", content: "Dari squash, gym, pilates, sama lari—mana yang paling kamu suka?" },
      { role: "user", content: "Aku paling suka squash." },
      { role: "agent", content: "Berapa lama sih kamu udah main squash ini?" },
      { role: "user", content: "Saya main squash mungkin udah dari 2017." },
      { role: "agent", content: "Gimana cara kamu bisa nyisipkan waktu buat squash di jadwal kerja kamu yang sibuk?" },
      { role: "user", content: "Jadi kalau squash itu di weekend aja sih, Sabtu, seminggu sekali jam delapan atau jam sembilan pagi." },
      { role: "agent", content: "Apa yang jadi pemicu kamu tertarik main squash lagi setelah pandemi?" },
      { role: "user", content: "Pertama kali diajak kakak untuk nyoba main squash terus udah lama nggak, baru 2022 baru ke ekspos lagi dan mulai main lagi." },
      { role: "agent", content: "Begitu kamu memutuskan 'Oke, gue mau main squash lagi,' apa satu hal pertama yang kamu lakukan?" },
      { role: "user", content: "Pertama kali nyari lapangannya dulu, terus booking di website GBK. Terus perlu coach jadi coachnya minta rekomendasi dari temen yang pernah main squash." },
      { role: "agent", content: "Apa tantangan atau kesulitan terbesar yang kamu hadapi waktu baru mulai lagi?" },
      { role: "user", content: "Lebih mungkin nyari temannya. Karena harganya lumayan dan dua jam, jadi kalau cuma dua tiga orang bakal capek banget. Jadi nyari minimal lima orang." },
      { role: "agent", content: "Gimana caranya kamu nyari temen-temen itu?" },
      { role: "user", content: "Dari keluarga dulu—kakak-kakak terus saudara. Baru besok-besokannya ajak teman kantor, teman kumpul." },
      { role: "agent", content: "Pas kamu lagi main squash, fokus utama kamu apa sih?" },
      { role: "user", content: "Lebih ke untuk ngeluarin energi dan santai aja, nggak terlalu ngetrack performa." },
      { role: "agent", content: "Biasanya kamu cari tips atau cara latihan dari mana?" },
      { role: "user", content: "Dari Coach karena dia yang sering ngelihat kita main. Tapi juga suka ngelihat video di TikTok yang sebentar-sebentar aja." },
      { role: "agent", content: "Menurutmu, apa sih arti 'komunitas' di olahraga squash ini?" },
      { role: "user", content: "Kalau komunitas, teman-teman main biasanya. Aku ikutnya yang mabar-mabar, jarang yang coaching." },
      { role: "agent", content: "Komunitas ini 'hidup'-nya di mana sih?" },
      { role: "user", content: "Kalau komunitas biasanya ikut dari aplikasi Reclub. Yang pasti lebih aktif pas ketemu langsung sih, online cuma untuk booking dan pembayaran." },
      { role: "agent", content: "Kamu tipe yang share hasil olahraga ke Instagram nggak?" },
      { role: "user", content: "Ya, lumayan sering. Biasanya video pas lagi main atau share berapa lama mainnya, kalorinya berapa." },
      { role: "agent", content: "Kenapa kamu share itu?" },
      { role: "user", content: "Sebenarnya lebih buat self improvement. Aku ngerekam main supaya bisa tahu harusnya kayak gini. Jadi buat documentation sekaligus self-reflection." },
      { role: "agent", content: "Aplikasi apa aja yang wajib ada di HP kamu buat dukung hobi squash ini?" },
      { role: "user", content: "Reclub, Kuy, WhatsApp buat coach, sama Instagram buat tahu jadwal." },
      { role: "agent", content: "Mana yang lebih sering kamu pakai—Reclub atau Kuy?" },
      { role: "user", content: "Reclub." },
      { role: "agent", content: "Kamu tau Reclub itu awalnya dari mana?" },
      { role: "user", content: "Dari teman yang ngepost main squash, terus lihat dia ikut komunitas dan ternyata harus join dari Reclub." },
      { role: "agent", content: "Apa kelebihan utama Reclub dibanding aplikasi lain?" },
      { role: "user", content: "Pilihan komunitas lebih banyak. Experience aplikasinya lebih mudah, lebih jelas, gampang untuk nemuin komunitas. Proses komunikasi dan pembayaran juga lebih mudah." },
      { role: "agent", content: "Tampilan apa yang paling kamu suka di Reclub?" },
      { role: "user", content: "Komunitas yang paling sering kita join ditampilin di paling depan. Jadi lebih gampang milih komunitas yang udah familiar." },
      { role: "agent", content: "Apa 'dosa terbesar' atau hal paling nyebelin dari Reclub?" },
      { role: "user", content: "Reclub sering banget ke logout. Sedangkan aku suka lupa passwordnya. Jadi harus bolak-balik forgot password." },
      { role: "agent", content: "Kalau besok kamu jadi CEO Reclub, satu hal apa yang mau kamu perbaiki atau tambahkan?" },
      { role: "user", content: "Mungkin cross-sell olahraga cabang lain. Jadi misalkan kemarin mainnya squash tapi diajak main pilates gitu." },
    ],
    audioUrl: "https://drive.google.com/file/d/1vP26ooohzxvHnCz_RbNEl8g6OYRUV-Cu/view?usp=drive_link",
    keyInsights: [
      "Finding enough people to share costs is a major friction point",
      "Uses recording for self-improvement, not social validation",
      "Frequent logout issues cause frustration with Reclub",
      "Wants cross-sport recommendations to discover new activities",
    ],
  },
  {
    id: "04",
    name: "Tias",
    tagline: "Corporate worker exploring racket sports via Reclap for open sessions",
    demographics: {
      occupation: "Karyawan Swasta",
      sport: "Squash, Padel, Tennis",
      experience: "3 tahun",
      apps: ["Reclap", "WhatsApp", "Instagram", "Apple Watch"],
    },
    accentColor: "from-emerald-500 to-teal-600",
    conversation: [
      { role: "agent", content: "Halo! Boleh tahu nama kamu siapa dan apa kesibukan sehari-hari kamu?" },
      { role: "user", content: "Nama aku Tias. Karyawan swasta, tiap hari ke kantor." },
      { role: "agent", content: "Udah berapa lama kamu menjalani hobi olahraga? Dan spesifiknya olahraga apa?" },
      { role: "user", content: "Sudah sekitar tiga tahun. Olahraganya squash, padel, terus sekarang lagi nyoba tenis." },
      { role: "agent", content: "Gimana cara kamu nyelipin waktu buat olahraga di jadwal kantor yang sibuk?" },
      { role: "user", content: "Weekend atau pulang kantor." },
      { role: "agent", content: "Ada hal lain yang terpaksa kamu korbankan biar bisa tetap olahraga?" },
      { role: "user", content: "Enggak sih, karena emang udah dijadwalin. Squash rutin tiap hari Minggu pagi, padel seminggu satu sampai dua kali." },
      { role: "agent", content: "Waktu pertama kali kamu mulai olahraga raket ini, apa pemicunya?" },
      { role: "user", content: "Pengen coba olahraga aja terus ada temen main squash jadi nyobain. Terus ada temen main padel jadi cobain. Ngeliat temen-temen aja." },
      { role: "agent", content: "Apa satu hal pertama yang kamu lakukan saat itu?" },
      { role: "user", content: "Ya temen dong. Ngechat nanya jadwalnya kapan, terus bilang mau ikut. Nggak beli apa-apa dulu karena raket dan bolanya udah disediain sama coachnya." },
      { role: "agent", content: "Di minggu-minggu awal, apa tantangan atau kesulitan terbesar?" },
      { role: "user", content: "Nggak terlalu ada kesulitan. Paling jadwal lapangannya yang available terbatas atau jadwal coachnya juga terbatas." },
      { role: "agent", content: "Coba bayangkan sesi olahraga terakhir kamu. Apa pemicunya?" },
      { role: "user", content: "Terakhir olahraga padel. Karena lagi liburan terus nggak terlalu punya aktivitas akhirnya nyari-nyari mabar padel di Reclap." },
      { role: "agent", content: "Gimana proses booking lapangannya di Reclap?" },
      { role: "user", content: "Gak booking lapangan. Orang nge-host gitu, open to public untuk main padel di lapangan ABC jam sekian, ada info transfer berapa. Ya udah ikutin aja." },
      { role: "agent", content: "Pas lagi main padel, fokus utama kamu apa?" },
      { role: "user", content: "Yang penting gerak aja sih. Olahraga aja, nggak terlalu ambisius harus menang." },
      { role: "agent", content: "Ada aplikasi yang nyala pas kamu lagi main?" },
      { role: "user", content: "Aku pakai Apple Watch jadi tracking sports. Kalau squash ada pilihan squash, kalau padel nggak ada jadi aku pilih yang mirip. Nge-track kalori gitu." },
      { role: "agent", content: "Dari proses booking sampai main, ada yang pengen kamu ubah?" },
      { role: "user", content: "Di Reclap udah bagus bisa base on location. Paling kalau pas nyampe lapangan, ribet identify yang mana club yang gue join." },
      { role: "agent", content: "Apa yang bikin kamu tetap berangkat di hari malas?" },
      { role: "user", content: "Kalau lagi malas ya nggak olahraga. Tapi kalau udah punya jadwal rutin, aku akan komit dan dateng." },
      { role: "agent", content: "Seberapa penting buat kamu untuk jadi makin jago di olahraga raket?" },
      { role: "user", content: "Nggak pengen jago-jago amat. Yang penting bisa dan nggak bikin kesel kalau lagi main. Lebih ke maintain the rally biar tetap bisa main terus." },
      { role: "agent", content: "Kamu cari tips dari mana?" },
      { role: "user", content: "Di Instagram suka ngeliat coach padel yang muncul. Kadang ditonton kadang nggak. Terus sambil main dikasih tahu temen cara mukul yang better." },
      { role: "agent", content: "Menurutmu 'komunitas' di olahraga raket artinya apa?" },
      { role: "user", content: "Temen main aja. Kalau padel sama temen kantor udah temenan dulu baru padel. Kalau sama stranger di squash, keep di temen olahraga aja." },
      { role: "agent", content: "Kamu tipe yang share hasil olahraga ke sosmed nggak?" },
      { role: "user", content: "Ya, suka update foto pas lagi main atau foto sama teman-teman yang hari itu main bareng. Tapi nggak share skor." },
      { role: "agent", content: "Kenapa kamu share foto-foto itu?" },
      { role: "user", content: "Biar seru aja. Abis main sama temen terus yaudah upload. Nggak punya motivasi khusus." },
      { role: "agent", content: "Aplikasi apa aja yang wajib ada di HP kamu buat olahraga?" },
      { role: "user", content: "WhatsApp penting untuk koordinasi dan transfer, Instagram untuk upload foto, e-commerce untuk beli alat-alat." },
      { role: "agent", content: "Dari semua aplikasi, mana yang paling sering kamu pakai buat olahraga?" },
      { role: "user", content: "Reclap akhir-akhir ini. Tapi kalau udah punya jadwal rutin, WhatsApp jadi lebih penting karena koordinasi via WhatsApp." },
      { role: "agent", content: "Tau Reclap awalnya dari mana?" },
      { role: "user", content: "Dari temen dulu, 2-3 tahun lalu pas mau coba baseball. Tahun ini install lagi karena banyak temen yang nyari mabar lewat Reclap." },
      { role: "agent", content: "Apa yang jadi hook-nya buat install ulang?" },
      { role: "user", content: "Karena temen nge-host di Reclap jadi perlu install buat jadi peserta. Kedua, bisa filter olahraga berdasarkan hari dan lokasi yang mau." },
      { role: "agent", content: "Apa kelebihan utama Reclap?" },
      { role: "user", content: "Nggak perlu hubungi temen satu-satu atau lapangan satu-satu. Semua info udah ada—jadwal, harga, jam, lokasi—tinggal lihat dan join." },
      { role: "agent", content: "Apa yang kurang dari Reclap?" },
      { role: "user", content: "Informasi fasilitas lapangan nggak terlalu detail. Pengen tau apakah ada kamar mandi, shower, atau fasilitas lain sebelum join." },
      { role: "agent", content: "Kalau jadi CEO Reclap, apa yang mau kamu tambahkan?" },
      { role: "user", content: "Filter berdasarkan lapangan spesifik. Karena aku punya lapangan favorit di Depok, pengen langsung lihat ada nggak jadwal di lapangan itu." },
    ],
    audioUrl: "https://drive.google.com/file/d/12erY-nMQHGm9Q9-cqQ_hUD_Ph5RZDnRf/view?usp=drive_link",
    keyInsights: [
      "Prefers open/hosted sessions over organizing own games",
      "No strong competitive drive - just wants to stay active",
      "Facility info (showers, toilets) missing from app listings",
      "Wants venue-specific filtering for favorite courts",
    ],
  },
  {
    id: "05",
    name: "Agung",
    tagline: "Serious runner training for full marathon, uses Garmin & Strava",
    demographics: {
      occupation: "Agency Worker",
      sport: "Running, Padel",
      experience: "3 tahun (lari)",
      apps: ["Garmin", "Strava", "Spotify", "WhatsApp"],
    },
    accentColor: "from-blue-500 to-indigo-600",
    conversation: [
      { role: "agent", content: "Halo! Apa sih kesibukan kamu sehari-hari?" },
      { role: "user", content: "Sehari-hari biasanya bangun tidur, aku lari pagi. Kalau weekend buka-buka di klub buat nyari sparing padel. Kerja di agency." },
      { role: "agent", content: "Udah berapa lama sih kamu menjalani hobi olahraga ini?" },
      { role: "user", content: "Kalau lari udah dari tiga tahun lalu, dari 2023. Kalau padel baru 2024 akhir, 2025 awal. Lari udah seminggu tiga kali." },
      { role: "agent", content: "Gimana sih cara kamu nyeimbangin semua itu?" },
      { role: "user", content: "Gampang sih. Istirahat cukup aja. Jam sepuluh udah tidur, bangun jam lima pagi, jam enam udah mulai lari, jam delapan udah pulang, mandi, siap kerja." },
      { role: "agent", content: "Waktu pertama kali kamu memutuskan untuk mulai lari, apa yang jadi pemicu?" },
      { role: "user", content: "Awal-awal lari karena patah hati." },
      { role: "agent", content: "Di minggu-minggu awal, apa tantangan atau kesulitan terbesar?" },
      { role: "user", content: "Susah ngumpulin niatnya. Susah nyari temen juga. Terus susah nyari sumber pelajaran yang tepat karena di internet lumayan scattered. Yang satu bilang A, yang satu bilang B." },
      { role: "agent", content: "Coba bayangkan sesi lari terakhir kamu. Apa yang jadi pemicu kamu berangkat?" },
      { role: "user", content: "Notif dari temen. Aku emang pengen latihan buat full marathon 2026. Terus janjian sama temen biar makin semangat. Pas lari kita bisa nongkrong ngopi." },
      { role: "agent", content: "Begitu kamu memutuskan berangkat lari, apa langkah pertama?" },
      { role: "user", content: "Kontak temen, nentuin titik ketemu di mana. Buka Spotify buat pilih lagu. Terus aku pakai Garmin jadi mulai lari dari Garmin. Bisa lihat aktivitas temen juga." },
      { role: "agent", content: "Pas lagi lari, fokus utama kamu apa?" },
      { role: "user", content: "Pas lagi lari ngejar performa, ngikutin training yang ada di jam. Setelah itu baru nongkrong." },
      { role: "agent", content: "Detik di mana kamu berhenti lari, apa hal pertama yang kamu lakukan?" },
      { role: "user", content: "Cek stats dulu, stop Garmin, pendinginan, baru ketemu temen." },
      { role: "agent", content: "Apa yang bikin kamu tetap berangkat lari di hari malas?" },
      { role: "user", content: "Target. Aku punya target full marathon 2026. Bayangin kalau aku nggak finish." },
      { role: "agent", content: "Motivasi kamu sekarang beda nggak sama awal?" },
      { role: "user", content: "Patah hati jadi trigger awal. Setelah rutin, healing karena lari. Biar nggak bosan, ikutan race. Sekarang mempunyai personal goal sendiri." },
      { role: "agent", content: "Biasanya kamu cari tips dari mana?" },
      { role: "user", content: "Dari TikTok, IG, influencer lari, dari temen, dari YouTube. Semuanya aku pakai. Tapi dari temen yang paling membantu." },
      { role: "agent", content: "Menurutmu 'komunitas' di olahraga lari artinya apa?" },
      { role: "user", content: "Biar makin semangat buat lari karena ada dorongan dari orang lain." },
      { role: "agent", content: "Komunitas ini lebih ramai di mana?" },
      { role: "user", content: "Lebih seru ketemu langsung. Grup WhatsApp agak kurang seru." },
      { role: "agent", content: "Kamu tipe yang share hasil olahraga nggak?" },
      { role: "user", content: "Foto status Strava aja, foto lagi ngopi. Biar bisa tahu status lari hari ini gimana, apa yang bisa improve. Sekalian buat partner juga kalau di-show di sosmed." },
      { role: "agent", content: "Aplikasi apa aja yang wajib ada di HP kamu?" },
      { role: "user", content: "Garmin, Spotify, Strava." },
      { role: "agent", content: "Mana yang paling favorit?" },
      { role: "user", content: "Strava. Buat kayak sosial media untuk olahraga. Bisa lihat orang-orang olahraga apa, bisa compare sama orang lain." },
      { role: "agent", content: "Tau Strava awalnya dari mana?" },
      { role: "user", content: "Dari temen sih. Udah lama banget." },
      { role: "agent", content: "Apa yang jadi hook-nya install Strava?" },
      { role: "user", content: "Biar aku olahraga tapi bisa nge-track olahraganya." },
      { role: "agent", content: "Apa kelebihan utama Strava?" },
      { role: "user", content: "Sosial sama fitur trackingnya. Bisa ngeliat apa yang udah aku lakukan, progres gimana." },
      { role: "agent", content: "Tampilan apa yang paling kamu suka?" },
      { role: "user", content: "Bisa lihat olahraga orang lain dan compare sama orang lain. Itu fitur yang paling bagus." },
      { role: "agent", content: "Apa yang nyebelin dari Strava?" },
      { role: "user", content: "Harus bayar biar semua fiturnya kebuka." },
      { role: "agent", content: "Ada fitur yang nggak pernah kamu pakai?" },
      { role: "user", content: "Challenge-challenge yang ngumpulin badge aku jarang ambil. Malu kalau kelihatan sama orang." },
    ],
    audioUrl: "https://drive.google.com/file/d/10Ts89jyXdk3xW3xL093PgCmZoq-Z6dr6/view?usp=drive_link",
    keyInsights: [
      "Started running for emotional healing, evolved to competitive goals",
      "Friends are the #1 source for tips over any digital content",
      "Social comparison on Strava is key motivator but avoids challenges",
      "Paywall for premium features is a pain point",
    ],
  },
  {
    id: "06",
    name: "Irfan",
    tagline: "Researcher balancing fitness and running for health",
    demographics: {
      occupation: "Researcher at BIS",
      sport: "Fitness, Running",
      experience: "1 tahun",
      apps: ["WhatsApp"],
    },
    accentColor: "from-rose-500 to-red-600",
    conversation: [
      { role: "agent", content: "Halo! Boleh tahu nama kamu dan apa kesibukan sehari-hari kamu?" },
      { role: "user", content: "Nama aku Irfan. Aku kerja di BIS sebagai researcher." },
      { role: "agent", content: "Sekarang kita mulai bahas hobi olahraga kamu. Udah berapa lama? Olahraga apa?" },
      { role: "user", content: "Fitness ruangan sama lari, sesekali setiap minggu mungkin sekali." },
      { role: "agent", content: "Udah berapa lama sih kamu melakukan fitness dan lari ini?" },
      { role: "user", content: "Sejak tahun lalu. Sejak berangkat ke Sumatra sempat berhenti. Tapi tahun ini mulai aktif lagi." },
      { role: "agent", content: "Gimana cara kamu nyisipan waktu buat olahraga di jadwal yang sibuk?" },
      { role: "user", content: "Biasanya weekend atau pagi sebelum kerja kalau ada waktu." },
      { role: "agent", content: "Pas kamu lagi lari atau fitness, fokus utama kamu apa?" },
      { role: "user", content: "Yang penting nyampe aja sih, jadi lumayan tetep. Konsisten dan kesehatan." },
      { role: "agent", content: "Ada aplikasi yang nyala pas kamu lagi lari?" },
      { role: "user", content: "Ya, ada tracking." },
    ],
    audioUrl: "https://drive.google.com/file/d/1IzGTjYLdA1D9vYGcEWh5eVnu1DLS0hmh/view?usp=drive_link",
    keyInsights: [
      "Work-life balance affects exercise consistency",
      "Focus on health maintenance over performance",
      "Simpler needs - basic tracking is sufficient",
    ],
  },
]

// Audio Player Component
function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [error, setError] = useState(false)

  const getDirectUrl = (url: string) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (match) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`
    }
    return url
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => setError(true))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "--:--"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const openInDrive = () => {
    window.open(audioUrl, '_blank')
  }

  return (
    <div className="bg-gray-100 rounded-2xl p-5">
      <audio
        ref={audioRef}
        src={getDirectUrl(audioUrl)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onError={() => setError(true)}
      />
      
      <div className="flex items-center gap-5">
        <button
          onClick={togglePlayPause}
          disabled={error}
          className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center shadow-md hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-white ml-0.5" />
          )}
        </button>
        
        <div className="flex-1">
          <div className="relative h-2 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gray-900 rounded-full transition-all"
              style={{ width: `${audioDuration ? (currentTime / audioDuration) * 100 : 0}%` }}
            />
            <input
              type="range"
              min="0"
              max={audioDuration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
              disabled={error}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(audioDuration)}</span>
          </div>
        </div>
        
        <button
          onClick={openInDrive}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
      
      {error && (
        <p className="text-xs text-amber-600 mt-3 text-center">
          Click the link icon to play in Google Drive
        </p>
      )}
    </div>
  )
}

// Full Page Transcript View - Light Mode
function TranscriptView({ 
  respondent, 
  onClose 
}: { 
  respondent: Respondent
  onClose: () => void 
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Content */}
      <div className="h-full flex flex-col lg:flex-row">
        {/* Left Sidebar - Info Panel */}
        <div className={`lg:w-[420px] lg:min-w-[420px] bg-gradient-to-b ${respondent.accentColor} p-6 lg:p-8 overflow-y-auto`}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="mb-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <X className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Close</span>
          </button>
          
          {/* Respondent Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white text-gray-900 text-3xl font-bold mb-4 shadow-xl">
              {respondent.id}
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{respondent.name}</h1>
            <p className="text-white/80 text-lg leading-relaxed">{respondent.tagline}</p>
          </div>
          
          {/* Meta Info */}
          <div className="space-y-4 mb-8">
            {respondent.demographics.occupation && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-lg">💼</span>
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider">Occupation</p>
                  <p className="text-white font-medium">{respondent.demographics.occupation}</p>
                </div>
              </div>
            )}
            {respondent.demographics.sport && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <span className="text-lg">🏃</span>
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider">Sport</p>
                  <p className="text-white font-medium">{respondent.demographics.sport}</p>
                </div>
              </div>
            )}
            {respondent.demographics.experience && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white/80" />
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider">Experience</p>
                  <p className="text-white font-medium">{respondent.demographics.experience}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Apps Used */}
          {respondent.demographics.apps && (
            <div className="mb-8">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Apps Discussed</p>
              <div className="flex flex-wrap gap-2">
                {respondent.demographics.apps.map((app, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-white/20 text-white text-sm">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Key Insights */}
          {respondent.keyInsights && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-white" />
                <p className="text-white/60 text-xs uppercase tracking-wider">Key Insights</p>
              </div>
              <div className="space-y-3">
                {respondent.keyInsights.map((insight, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    <p className="text-white/90 text-sm leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Panel - Conversation */}
        <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
          {/* Audio Player Bar */}
          <div className="p-6 bg-white border-b border-gray-200">
            <AudioPlayer audioUrl={respondent.audioUrl} />
          </div>
          
          {/* Conversation Header */}
          <div className="px-6 lg:px-8 py-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-gray-400" />
              <h2 className="text-gray-500 text-sm uppercase tracking-wider font-medium">Full Conversation</h2>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500 text-sm">{respondent.conversation.length} messages</span>
            </div>
          </div>
          
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {respondent.conversation.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%]`}>
                    {/* Speaker Label */}
                    <p className={`text-xs mb-2 font-medium ${message.role === "user" ? "text-right text-gray-500" : "text-gray-500"}`}>
                      {message.role === "agent" ? "Putri (AI Interviewer)" : respondent.name}
                    </p>
                    {/* Message Bubble */}
                    <div
                      className={`rounded-2xl px-5 py-4 ${
                        message.role === "user"
                          ? `bg-gradient-to-br ${respondent.accentColor} text-white shadow-md`
                          : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Respondent Card - Light Mode
function RespondentCard({ 
  respondent, 
  onClick,
  index
}: { 
  respondent: Respondent
  onClick: () => void
  index: number
}) {
  return (
    <button
      onClick={onClick}
      className="group relative text-left w-full animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      <div className="relative bg-white rounded-3xl border border-gray-200 p-6 h-full transition-all duration-300 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1">
        {/* Accent Top Bar */}
        <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${respondent.accentColor} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
        
        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${respondent.accentColor} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
              {respondent.id}
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
          </div>
          
          {/* Name & Tagline */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
            {respondent.name}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
            {respondent.tagline}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {respondent.demographics.sport && (
              <span className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${respondent.accentColor} text-white text-xs font-medium shadow-sm`}>
                {respondent.demographics.sport.split(',')[0].trim()}
              </span>
            )}
            {respondent.demographics.experience && (
              <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                {respondent.demographics.experience}
              </span>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-5 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-medium">{respondent.conversation.length} messages</span>
            </div>
            <span className={`text-xs font-semibold bg-gradient-to-r ${respondent.accentColor} bg-clip-text text-transparent`}>
              View →
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function GojekReportPage() {
  const [selectedRespondent, setSelectedRespondent] = useState<Respondent | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {!selectedRespondent && <Header />}
      
      {/* Full Page Transcript View */}
      {selectedRespondent && (
        <TranscriptView 
          respondent={selectedRespondent} 
          onClose={() => setSelectedRespondent(null)} 
        />
      )}
      
      {/* Main Content */}
      {!selectedRespondent && (
        <main className="pt-20">
          {/* Hero Section */}
          <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
              {/* Back Link */}
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-12"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
              
              {/* Logo & Title */}
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="currentColor"/>
                      <path d="M12 12m-4 0a4 4 0 0 1 8 0a4 4 0 0 1 -8 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M12 12m-7 0a7 7 0 0 1 14 0a7 7 0 0 1 -14 0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
                  <span className="text-gray-400 text-lg font-semibold tracking-wide">TRANZMIT</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                  Sports App User Research
                </h1>
                
                <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
                  Deep-dive AI interviews with sports enthusiasts exploring their habits, 
                  motivations, and app usage patterns for Reclub, Kuy, Strava, and more.
                </p>
              </div>
            </div>
          </div>
          
          {/* Stats Strip */}
          <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
                <div className="py-8 px-6">
                  <p className="text-4xl font-bold text-gray-900 mb-1">{respondents.length}</p>
                  <p className="text-gray-500 text-sm">Interviews</p>
                </div>
                <div className="py-8 px-6">
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    {respondents.reduce((acc, r) => acc + r.conversation.length, 0)}
                  </p>
                  <p className="text-gray-500 text-sm">Messages</p>
                </div>
                <div className="py-8 px-6">
                  <p className="text-4xl font-bold text-gray-900 mb-1">5+</p>
                  <p className="text-gray-500 text-sm">Apps Discussed</p>
                </div>
                <div className="py-8 px-6">
                  <p className="text-4xl font-bold text-gray-900 mb-1">6</p>
                  <p className="text-gray-500 text-sm">Sports Covered</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Respondents Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">All Responses</h2>
                <p className="text-gray-500">Click any card to view the full transcript and audio</p>
              </div>
            </div>
            
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {respondents.map((respondent, index) => (
                <RespondentCard
                  key={respondent.id}
                  respondent={respondent}
                  index={index}
                  onClick={() => setSelectedRespondent(respondent)}
                />
              ))}
            </div>
          </div>
          
          {/* Themes Section */}
          <div className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex items-center gap-3 mb-10">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h2 className="text-2xl font-bold text-gray-900">Key Themes Across Interviews</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Payment Fragmentation", desc: "Users want integrated booking and payment in one app instead of switching between platforms", color: "from-orange-500 to-amber-500" },
                  { title: "Community Discovery", desc: "Finding teammates and communities is a major friction point, especially for team sports", color: "from-violet-500 to-purple-500" },
                  { title: "Social Features Gap", desc: "Users want to share progress within sports apps rather than switching to Instagram", color: "from-emerald-500 to-teal-500" },
                  { title: "Word-of-Mouth Rules", desc: "Friends are the #1 discovery channel for sports apps, beating ads and algorithms", color: "from-blue-500 to-indigo-500" },
                ].map((theme, i) => (
                  <div key={i} className="group p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-4`}>
                      <span className="text-white text-lg font-bold">{i + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{theme.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{theme.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Footer />
        </main>
      )}
    </div>
  )
}
