const MOVECARE_EXERCISES = [

  /* =========================
     إحماء
  ========================= */

  {
    id: "warmup_01",
    name: "المشي في المكان",
    category: "إحماء",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "walk",
    description: "امشِ في مكانك بوتيرة مريحة وحافظ على تنفس طبيعي."
  },

  {
    id: "warmup_02",
    name: "رفع الركبتين الخفيف",
    category: "إحماء",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "walk",
    description: "ارفع الركبتين بالتناوب بشكل مريح."
  },

  {
    id: "warmup_03",
    name: "دوائر الذراعين",
    category: "إحماء",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "arms",
    description: "حرّك الذراعين في دوائر صغيرة ثم زد الحركة تدريجيًا."
  },

  {
    id: "warmup_04",
    name: "تحريك الكتفين",
    category: "إحماء",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "shoulders",
    description: "حرّك الكتفين إلى الأمام والخلف بلطف."
  },

  {
    id: "warmup_05",
    name: "خطوات جانبية",
    category: "إحماء",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "side",
    description: "خذ خطوات صغيرة إلى اليمين واليسار."
  },


  /* =========================
     الرجلين
  ========================= */

  {
    id: "legs_01",
    name: "القرفصاء",
    category: "الرجلين",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "squat",
    description: "انزل بجسمك بشكل متحكم ثم عد إلى الوقوف."
  },

  {
    id: "legs_02",
    name: "القرفصاء الواسعة",
    category: "الرجلين",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "squat",
    description: "افتح القدمين قليلًا ثم نفذ القرفصاء بطريقة مريحة."
  },

  {
    id: "legs_03",
    name: "الاندفاع الأمامي",
    category: "الرجلين",
    duration: 30,
    level: "متوسط",
    equipment: "بدون معدات",
    movement: "lunge",
    description: "خذ خطوة للأمام وانزل قليلًا ثم عد إلى وضع البداية."
  },

  {
    id: "legs_04",
    name: "رفع الساق",
    category: "الرجلين",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "leg",
    description: "ارفع ساقًا بشكل متحكم ثم أنزلها."
  },

  {
    id: "legs_05",
    name: "رفع الساق الجانبي",
    category: "الرجلين",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "leg",
    description: "ارفع الساق إلى الجانب ثم أعدها ببطء."
  },

  {
    id: "legs_06",
    name: "رفع الكعبين",
    category: "الرجلين",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "calf",
    description: "ارفع الكعبين عن الأرض ثم عد ببطء."
  },

  {
    id: "legs_07",
    name: "الجسر",
    category: "الرجلين",
    duration: 30,
    level: "مبتدئ",
    equipment: "بساط اختياري",
    movement: "bridge",
    description: "استلقِ بشكل مريح وارفع الحوض ببطء ثم أنزله."
  },

  {
    id: "legs_08",
    name: "الجلوس على الحائط",
    category: "الرجلين",
    duration: 25,
    level: "متوسط",
    equipment: "حائط",
    movement: "wall",
    description: "اسند ظهرك إلى الحائط وحافظ على وضع مريح."
  },


  /* =========================
     الصدر
  ========================= */

  {
    id: "chest_01",
    name: "الضغط على الحائط",
    category: "الصدر",
    duration: 30,
    level: "مبتدئ",
    equipment: "حائط",
    movement: "push",
    description: "ضع يديك على الحائط وادفع جسمك نحوه ثم ابتعد."
  },

  {
    id: "chest_02",
    name: "الضغط المعدل",
    category: "الصدر",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "push",
    description: "نفذ نسخة مريحة من الضغط مع الحفاظ على التحكم."
  },

  {
    id: "chest_03",
    name: "تمدد الصدر",
    category: "الصدر",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "stretch",
    description: "مد عضلات الصدر والكتفين بلطف."
  },


  /* =========================
     الظهر
  ========================= */

  {
    id: "back_01",
    name: "تمدد الظهر",
    category: "الظهر",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "stretch",
    description: "حافظ على حركة لطيفة ومريحة للظهر."
  },

  {
    id: "back_02",
    name: "تمدد جانبي",
    category: "الظهر",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "stretch",
    description: "مد جسمك إلى أحد الجانبين بلطف ثم بدّل الجهة."
  },

  {
    id: "back_03",
    name: "وضعية الطفل",
    category: "الظهر",
    duration: 30,
    level: "مبتدئ",
    equipment: "بساط اختياري",
    movement: "stretch",
    description: "اتخذ وضعية مريحة ومد الذراعين إلى الأمام."
  },

  {
    id: "back_04",
    name: "تمدد القط والجمل",
    category: "الظهر",
    duration: 30,
    level: "مبتدئ",
    equipment: "بساط اختياري",
    movement: "catcow",
    description: "حرّك الظهر ببطء بين وضعيتين مريحتين."
  },


  /* =========================
     الذراعين والكتفين
  ========================= */

  {
    id: "arms_01",
    name: "دوائر الذراعين",
    category: "الذراعين",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "arms",
    description: "حرّك الذراعين في دوائر صغيرة ومريحة."
  },

  {
    id: "arms_02",
    name: "رفع الذراعين",
    category: "الذراعين",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "arms",
    description: "ارفع الذراعين ثم أنزلهما ببطء."
  },

  {
    id: "arms_03",
    name: "تمدد الذراع",
    category: "الذراعين",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "stretch",
    description: "مد الذراع بلطف دون إجبار المفصل."
  },

  {
    id: "arms_04",
    name: "ضغط الترايسبس على الحائط",
    category: "الذراعين",
    duration: 30,
    level: "متوسط",
    equipment: "حائط",
    movement: "push",
    description: "استخدم الحائط لأداء حركة دفع متحكم بها."
  },


  /* =========================
     البطن والجذع
  ========================= */

  {
    id: "core_01",
    name: "بلانك",
    category: "البطن",
    duration: 20,
    level: "متوسط",
    equipment: "بساط اختياري",
    movement: "plank",
    description: "حافظ على جسمك ثابتًا بطريقة مريحة."
  },

  {
    id: "core_02",
    name: "رفع الركبتين",
    category: "البطن",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "walk",
    description: "ارفع الركبتين بالتناوب مع الحفاظ على التحكم."
  },

  {
    id: "core_03",
    name: "لمس الركبة",
    category: "البطن",
    duration: 30,
    level: "متوسط",
    equipment: "بدون معدات",
    movement: "core",
    description: "نفذ الحركة ببطء وبدون إجبار الجسم."
  },

  {
    id: "core_04",
    name: "تمدد الجذع",
    category: "البطن",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "stretch",
    description: "مد الجذع بلطف وحافظ على تنفس طبيعي."
  },


  /* =========================
     التوازن
  ========================= */

  {
    id: "balance_01",
    name: "الوقوف على ساق واحدة",
    category: "التوازن",
    duration: 20,
    level: "مبتدئ",
    equipment: "حائط اختياري",
    movement: "balance",
    description: "قف بشكل ثابت ويمكنك استخدام حائط قريب للدعم."
  },

  {
    id: "balance_02",
    name: "المشي من كعب إلى أصابع",
    category: "التوازن",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "walk",
    description: "تحرك ببطء وحافظ على توازنك."
  },


  /* =========================
     تمارين خفيفة
  ========================= */

  {
    id: "easy_01",
    name: "المشي الخفيف",
    category: "خفيف",
    duration: 60,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "walk",
    description: "تحرك بوتيرة مريحة."
  },

  {
    id: "easy_02",
    name: "تمدد كامل للجسم",
    category: "خفيف",
    duration: 45,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "stretch",
    description: "حرك الجسم ومده بلطف."
  },

  {
    id: "easy_03",
    name: "تنفس واسترخاء",
    category: "خفيف",
    duration: 60,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "breathing",
    description: "اجلس أو قف بشكل مريح وخذ أنفاسًا طبيعية وهادئة."
  },


  /* =========================
     تمارين متوسطة
  ========================= */

  {
    id: "medium_01",
    name: "سكوات مع توقف",
    category: "قوة",
    duration: 30,
    level: "متوسط",
    equipment: "بدون معدات",
    movement: "squat",
    description: "نفذ القرفصاء ببطء وحافظ على التحكم."
  },

  {
    id: "medium_02",
    name: "اندفاع جانبي",
    category: "قوة",
    duration: 30,
    level: "متوسط",
    equipment: "بدون معدات",
    movement: "lunge",
    description: "تحرك جانبيًا بمدى مريح."
  },

  {
    id: "medium_03",
    name: "ضغط متدرج",
    category: "قوة",
    duration: 30,
    level: "متوسط",
    equipment: "بدون معدات",
    movement: "push",
    description: "نفذ الحركة بشكل تدريجي ومتحكم."
  },

  {
    id: "medium_04",
    name: "بلانك جانبي معدل",
    category: "قوة",
    duration: 20,
    level: "متوسط",
    equipment: "بساط اختياري",
    movement: "plank",
    description: "حافظ على وضع ثابت ومريح."
  },


  /* =========================
     تمدد
  ========================= */

  {
    id: "stretch_01",
    name: "تمدد الساق الخلفية",
    category: "تمدد",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "stretch",
    description: "مد الساق بلطف دون الوصول إلى الألم."
  },

  {
    id: "stretch_02",
    name: "تمدد الكتفين",
    category: "تمدد",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "stretch",
    description: "حرك الكتفين والذراعين بلطف."
  },

  {
    id: "stretch_03",
    name: "تمدد الجذع الجانبي",
    category: "تمدد",
    duration: 30,
    level: "مبتدئ",
    equipment: "بدون معدات",
    movement: "stretch",
    description: "مد جانب الجسم بلطف ثم بدّل الجهة."
  }

];


/* =================================
   أدوات البحث في قاعدة التمارين
================================= */

function getExercisesByCategory(category) {

  return MOVECARE_EXERCISES.filter(
    exercise => exercise.category === category
  );

}


function getExercisesByLevel(level) {

  return MOVECARE_EXERCISES.filter(
    exercise => exercise.level === level
  );

}


function getExerciseById(id) {

  return MOVECARE_EXERCISES.find(
    exercise => exercise.id === id
  );

    }
