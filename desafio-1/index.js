async function taskOne(url) {
  try {
    const data = await fetch(url);
    if (data.ok) {
      const dataJson = await data.json();
      console.log("data retrieved ok: ", dataJson);
    } else {
      throw new Error(data.status);
    }
  } catch (error) {
    console.error("Error getting data: ", error.message);
  }
}

function taskTwo() {
  setTimeout(() => {
    console.log(`task 2 finished`);
  }, 0);
}

taskTwo();

taskOne("https://dragonball-api.com/api/characters?page=2&limit=1");

console.log("Servidor funcionando");
