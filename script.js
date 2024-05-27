document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const mainContainer = document.querySelector('main');
        data.forEach(category => {
          const section = document.createElement('section');
          section.classList.add('mb-4');
          section.id = category.category.toLowerCase().replace(/\s+/g, '-');
          
          const title = document.createElement('h4');
          title.classList.add('mb-2');
          title.textContent = category.category;
          
          section.appendChild(title);
          
          const row = document.createElement('div');
          row.classList.add('row');
          
          category.jobs.forEach(job => {
            const col = document.createElement('div');
            col.classList.add('col-md-4');
            
            const jobBox = document.createElement('div');
            jobBox.classList.add('job-box');
            
            const jobTitle = document.createElement('h5');
            jobTitle.textContent = job.title;
            
            const salary = document.createElement('p');
            salary.innerHTML = `<b>$${job.salary.toLocaleString()}</b>`;
            
            const salaryInfo = document.createElement('div');
            salaryInfo.classList.add('salary-info');
            
            const lowHighLow = document.createElement('div');
            lowHighLow.classList.add('low-high');
            lowHighLow.innerHTML = `<p>low</p><p><b>$${job.low.toLocaleString()}</b></p>`;
            
            const lowHighHigh = document.createElement('div');
            lowHighHigh.classList.add('low-high');
            lowHighHigh.innerHTML = `<p>high</p><p><b>$${job.high.toLocaleString()}</b></p>`;
            
            salaryInfo.appendChild(lowHighLow);
            salaryInfo.appendChild(lowHighHigh);
            
            jobBox.appendChild(jobTitle);
            jobBox.appendChild(salary);
            jobBox.appendChild(salaryInfo);
            col.appendChild(jobBox);
            row.appendChild(col);
          });
          
          section.appendChild(row);
          mainContainer.appendChild(section);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
