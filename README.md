# Yarin Taberi – אתר הסטודיו

אתר שמלות ערב וכלה בתפירה אישית. בנוי ב-[Astro](https://astro.build), בעברית (מימין לשמאל), עם מקום לגרסה באנגלית.

## הרצה מקומית

```bash
npm install
npm run dev      # תצוגה מקומית בכתובת http://localhost:4321
npm run build    # בנייה לתיקיית dist
```

## איפה מה

| מה | איפה |
|---|---|
| עיצוב (צבעים, פונטים, אנימציות) | `src/styles/global.css` |
| כותרת, תפריט, פוטר | `src/layouts/Base.astro` |
| דף הבית | `src/pages/index.astro` |
| שמלות (קובץ לכל שמלה) | `src/content/dresses/*.md` |
| תמונות | `public/images/` |
| טופס פגישה | `src/components/BookForm.astro` (עוד לא מחובר לשירות שליחה) |
| התנהגות (תפריט, גלילה, אנימציות) | `src/scripts/site.js` |

## הוספת שמלה

יוצרים קובץ חדש ב-`src/content/dresses/`, למשל `my-dress.md`, מעתיקים את המבנה מקובץ קיים, ומשנים שם, תמונות ופרטים. השמלה מופיעה אוטומטית בעמוד הקולקציה ומקבלת עמוד משלה.

## לפני פרסום

- להחליף את `site` ב-`astro.config.mjs` לדומיין האמיתי
- להסיר את `noindex` מ-`src/layouts/Base.astro`
- להשלים הצהרת נגישות ומדיניות פרטיות
- לחבר את טופס הפגישה
- טקסטים בסוגריים מרובעים `[...]` מחכים לתוכן אמיתי
