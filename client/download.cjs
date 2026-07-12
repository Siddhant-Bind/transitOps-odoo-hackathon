const https = require('https');
const fs = require('fs');

const urls = {
  'fleet.html': "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NjYzMzRlZjUxODUwMzM4NDdlMDY4MTBkZTlhEgsSBxDw2K2KkxQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMxNDEzNTMyMTY1OTAzMzM0Nw&filename=&opi=89354086",
  'trips.html': "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NjYzMzRmODJiMWIwNmMyNDZhODZmMzc4MWEwEgsSBxDw2K2KkxQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMxNDEzNTMyMTY1OTAzMzM0Nw&filename=&opi=89354086",
  'drivers.html': "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NjYzMzRkN2ZhMTYwMjA3YTRiZTQyMGQwZjA5EgsSBxDw2K2KkxQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMxNDEzNTMyMTY1OTAzMzM0Nw&filename=&opi=89354086",
  'fuel.html': "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NjYzMzRjZDU1OTYwNGVhYWIwZDM0MDkzMDFiEgsSBxDw2K2KkxQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMxNDEzNTMyMTY1OTAzMzM0Nw&filename=&opi=89354086",
  'maintenance.html': "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NjYzMzRhOWUwOWYwODI5Yjc0NWQ1MjliNTdjEgsSBxDw2K2KkxQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMxNDEzNTMyMTY1OTAzMzM0Nw&filename=&opi=89354086",
  'reports.html': "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NjYzMzRiYzYzZTIwODI5Yjc0NWQ1MjliNTdjEgsSBxDw2K2KkxQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMxNDEzNTMyMTY1OTAzMzM0Nw&filename=&opi=89354086",
  'settings.html': "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1NjYzMzUxOTBiYjkwMzM4NDdlMDY4MTBkZTlhEgsSBxDw2K2KkxQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMxNDEzNTMyMTY1OTAzMzM0Nw&filename=&opi=89354086"
};

const download = (filename, url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(filename, data);
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', reject);
  });
};

Promise.all(Object.entries(urls).map(([f, u]) => download(f, u)))
  .then(() => console.log('All downloads complete.'))
  .catch(console.error);
