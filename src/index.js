/*
 * This file is part of the ros-jetson-stats-webcomponent package (https://github.com/bobboteck/ros-jetson-stats-webcomponent).
 * Copyright (c) 2020 Roberto D'Amico (Bobboteck).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

const template = document.createElement('template');

template.innerHTML = `
<style>
.jetson-stats
{
	/*border: 1px solid black;*/
}
.jetson-stats h3
{
	text-align: center;
}
.widget-cpu, .widget-gpu, .widget-ram, .widget-swap, .widget-disk
{
	padding: 0 5px 5px 5px;
}
.widget-cpu-row, .widget-gpu-row, .widget-ram-row, .widget-swap-row, .widget-disk-row
{
	width: 100%;
}
.widget-cpu-percentage, .widget-ram-used, .widget-swap-used, .widget-disk-used
{
	width: 50%;
	float: left;
}
.widget-gpu-percentage
{
	width: 100%;
}
.widget-cpu-frequency, .widget-ram-total, .widget-swap-total, .widget-disk-total
{
	text-align: right;
}
.cpu-progress, .gpu-progress, .ram-progress, .swap-progress, .disk-progress
{
	width: 100%;
}
</style>
<div class="jetson-stats">
	<div id="cpu1-widget" class="widget-cpu">
		<div class="widget-cpu-row">
			<div class="widget-cpu-percentage">CPU 1 [<label id="cpu1-percentage">-</label>]</div>
			<div class="widget-cpu-frequency"><label id="cpu1-frequency">-</label></div>
		</div>
		<div class="widget-cpu-row">
			<progress id="cpu1-progress" class="cpu-progress" value="0" max="100"></progress>
		</div>
	</div>
	<div id="cpu2-widget2" class="widget-cpu">
		<div class="widget-cpu-row">
			<div class="widget-cpu-percentage">CPU 2 [<label id="cpu2-percentage">-</label>]</div>
			<div class="widget-cpu-frequency"><label id="cpu2-frequency">-</label></div>
		</div>
		<div class="widget-cpu-row">
			<progress id="cpu2-progress" class="cpu-progress" value="0" max="100"></progress>
		</div>
	</div>
	<div id="cpu3-widget" class="widget-cpu">
		<div class="widget-cpu-row">
			<div class="widget-cpu-percentage">CPU 3 [<label id="cpu3-percentage">-</label>]</div>
			<div class="widget-cpu-frequency"><label id="cpu3-frequency">-</label></div>
		</div>
		<div class="widget-cpu-row">
			<progress id="cpu3-progress" class="cpu-progress" value="0" max="100"></progress>
		</div>
	</div>
	<div id="cpu4-widget" class="widget-cpu">
		<div class="widget-cpu-row">
			<div class="widget-cpu-percentage">CPU 4 [<label id="cpu4-percentage">-</label>]</div>
			<div class="widget-cpu-frequency"><label id="cpu4-frequency">-</label></div>
		</div>
		<div class="widget-cpu-row">
			<progress id="cpu4-progress" class="cpu-progress" value="0" max="100"></progress>
		</div>
	</div>
	<div class="widget-gpu">
		<div class="widget-gpu-row">
			<div class="widget-gpu-percentage">GPU [<label id="gpu-percentage">-</label>]</div>
		</div>
		<div class="widget-gpu-row">
			<progress id="gpu-progress" class="gpu-progress" value="0" max="100"></progress>
		</div>
	</div>
	<div class="widget-ram">
		<div class="widget-ram-row">
			<div class="widget-ram-used">RAM [<label id="ram-used">-</label>]</div>
			<div class="widget-ram-total"><label id="ram-total">-</label></div>
		</div>
		<div class="widget-ram-row">
			<progress id="ram-progress" class="ram-progress" value="0" max="0"></progress>
		</div>
	</div>
	<div class="widget-swap">
		<div class="widget-swap-row">
			<div class="widget-swap-used">SWAP [<label id="swap-used">-</label>]</div>
			<div class="widget-swap-total"><label id="swap-total">-</label></div>
		</div>
		<div class="widget-swap-row">
			<progress id="swap-progress" class="swap-progress" value="0" max="0"></progress>
		</div>
	</div>
	<div class="widget-disk">
		<div class="widget-disk-row">
			<div class="widget-disk-used">DISK [<label id="disk-used">-</label>]</div>
			<div class="widget-disk-total"><label id="disk-total">-</label></div>
		</div>
		<div class="widget-disk-row">
			<progress id="disk-progress" class="disk-progress" value="0" max="0"></progress>
		</div>
	</div>
</div>
`;

class JetsonStats extends HTMLElement
{
	constructor()
	{
		super();
		this._shadowRoot = this.attachShadow({ mode: 'open' });
		this._shadowRoot.appendChild(template.content.cloneNode(true));

		//this.$title = this._shadowRoot.querySelector('h3'); 
		// Stats of CPU 1
		this.$cpu1_percentage = this._shadowRoot.getElementById("cpu1-percentage");
		this.$cpu1_progress = this._shadowRoot.getElementById("cpu1-progress");
		this.$cpu1_frequency = this._shadowRoot.getElementById("cpu1-frequency") ;
		// Stats of CPU 2
		this.$cpu2_percentage = this._shadowRoot.getElementById("cpu2-percentage");
		this.$cpu2_progress = this._shadowRoot.getElementById("cpu2-progress");
		this.$cpu2_frequency = this._shadowRoot.getElementById("cpu2-frequency");
		// Stats of CPU 3
		this.$cpu3_percentage = this._shadowRoot.getElementById("cpu3-percentage");
		this.$cpu3_progress = this._shadowRoot.getElementById("cpu3-progress");
		this.$cpu3_frequency = this._shadowRoot.getElementById("cpu3-frequency");
		this.$cpu3_widget = this._shadowRoot.getElementById("cpu3-widget");
		// Stats of CPU 4
		this.$cpu4_percentage = this._shadowRoot.getElementById("cpu4-percentage");
		this.$cpu4_progress = this._shadowRoot.getElementById("cpu4-progress");
		this.$cpu4_frequency = this._shadowRoot.getElementById("cpu4-frequency");
		this.$cpu4_widget = this._shadowRoot.getElementById("cpu4-widget");
		// Stats of GPU
		this.$gpu_percentage = this._shadowRoot.getElementById("gpu-percentage");
		this.$gpu_progress = this._shadowRoot.getElementById("gpu-progress");
		// Stats of RAM
		this.$ram_used = this._shadowRoot.getElementById("ram-used");
		this.$ram_total = this._shadowRoot.getElementById("ram-total");
		this.$ram_progress = this._shadowRoot.getElementById("ram-progress");
		// Stats of SWAP
		this.$swap_used = this._shadowRoot.getElementById("swap-used");
		this.$swap_total = this._shadowRoot.getElementById("swap-total");
		this.$swap_progress = this._shadowRoot.getElementById("swap-progress");
		// Stats of Disk
		this.$disk_used = this._shadowRoot.getElementById("disk-used");
		this.$disk_total = this._shadowRoot.getElementById("disk-total");
		this.$disk_progress = this._shadowRoot.getElementById("disk-progress");
		// Stats data variable
		this.stats_data = null;
	}

	set data(value)
	{
		this.stats_data = value;
		this.setAttribute('data', value);
	}

	static get observedAttributes()
	{
		return ['showOffCpu', 'data'];
	}

	attributeChangedCallback(name, oldVal, newVal)
	{
		this.render();
	}

	render()
	{
		//this.$title.innerHTML = this.title;

		if (this.stats_data)
		{
			// Stats of CPU 1
			this.$cpu1_percentage.innerHTML = this.stats_data.status[1].values[1].value;
			this.$cpu1_progress.value = parseInt(this.stats_data.status[1].values[1].value);
			this.$cpu1_frequency.innerHTML = this.stats_data.status[1].values[2].value;
			// Stats of CPU 2
			this.$cpu2_percentage.innerHTML = this.stats_data.status[2].values[1].value;
			this.$cpu2_progress.value = parseInt(this.stats_data.status[2].values[1].value);
			this.$cpu2_frequency.innerHTML = this.stats_data.status[2].values[2].value;
			
			// Stats of CPU 3
			if(this.stats_data.status[3].message === "OFF")
			{
				// Check if need to show powered off CPU
				if(this.showOffCpu)
				{
					this.$cpu3_percentage.innerHTML = "Off";
					this.$cpu3_progress.value = 0;
					this.$cpu3_frequency.innerHTML = "-";
				}
				else
				{
					//this.$cpu3_widget.setAttribute("display", "none");	//TODO:
					this.$cpu3_widget.style.display = "none";
				}
			}
			else
			{
				this.$cpu3_percentage.innerHTML = this.stats_data.status[3].values[1].value;
				this.$cpu3_progress.value = parseInt(this.stats_data.status[3].values[1].value);
				this.$cpu3_frequency.innerHTML = this.stats_data.status[3].values[2].value;
			}
			// Stats of CPU 4
			if(this.stats_data.status[4].message === "OFF")
			{
				// Check if need to show powered off CPU
				if(this.showOffCpu)
				{
					this.$cpu4_percentage.innerHTML = "Off";
					this.$cpu4_progress.value = 0;
					this.$cpu4_frequency.innerHTML = "-";
				}
				else
				{
					//this.$cpu4_widget.setAttribute("display", "none");	//TODO:
					this.$cpu4_widget.style.display = "none";
				}
			}
			else
			{
				this.$cpu4_percentage.innerHTML = this.stats_data.status[4].values[1].value;
				this.$cpu4_progress.value = parseInt(this.stats_data.status[4].values[1].value);
				this.$cpu4_frequency.innerHTML = this.stats_data.status[4].values[2].value;
			}

			// Stats of GPU
			this.$gpu_percentage.innerHTML = this.stats_data.status[5].message;
			this.$gpu_progress.value = parseInt(this.stats_data.status[5].message);
			// Stats of RAM
			this.$ram_used.innerHTML = this.stats_data.status[6].values[0].value;
			this.$ram_total.innerHTML = this.stats_data.status[6].values[1].value;
			this.$ram_progress.value = parseFloat(this.stats_data.status[6].values[0].value)*1000;
			this.$ram_progress.max = parseFloat(this.stats_data.status[6].values[1].value)*1000;
			// Stats of SWAP
			this.$swap_used.innerHTML = this.stats_data.status[7].values[0].value;
			this.$swap_total.innerHTML = this.stats_data.status[7].values[1].value;
			this.$swap_progress.value = parseFloat(this.stats_data.status[7].values[0].value)*1000;
			this.$swap_progress.max = parseFloat(this.stats_data.status[7].values[1].value)*1000;
			// Stats of Disk
			this.$disk_used.innerHTML = this.stats_data.status[13].values[0].value;
			this.$disk_total.innerHTML = this.stats_data.status[13].values[1].value;
			this.$disk_progress.value = parseFloat(this.stats_data.status[13].values[0].value)*1000;
			this.$disk_progress.max = parseFloat(this.stats_data.status[13].values[1].value)*1000;
		}
	}
	
}

window.customElements.define('jetson-stats', JetsonStats);