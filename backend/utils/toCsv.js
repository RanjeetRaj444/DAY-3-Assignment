function toCsv(data) {
  const header = "id,title,status,createdAt\n";
  const rows = data.map(
    (task) => `${task.id},${task.title},${task.status},${task.createdAt}`
  );
  return header + rows.join("\n");
}

module.exports = { toCsv };
